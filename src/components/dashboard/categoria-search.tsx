"use client"

import { useState } from "react"
import { CalendarIcon, Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function CategoriaSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "")
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date") as string) : undefined,
  )

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)

    if (searchQuery) {
      params.set("query", searchQuery)
    } else {
      params.delete("query")
    }

    if (date) {
      params.set("date", date.toISOString().split("T")[0])
    } else {
      params.delete("date")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setDate(undefined)
    router.push(pathname)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="text-lg font-medium">Buscar Categorias</h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre de la categoria..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left sm:w-[240px]", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Filtrar por fecha"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
        <div className="flex gap-2">
          <Button onClick={handleSearch}>Buscar</Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  )
}
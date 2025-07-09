'use client';

import Image from "next/image";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { UsuarioRespuesta } from "@/interfaces/UsuarioInterfaz";
import { obtenerCookie } from "@/lib/ObtencionCookie";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, FileText, Edit, Save, X, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { actualizarDatosUsuario } from "@/api/Usuario";

export default function AdminProfilePage() {
    const router = useRouter();
    
    const [user, setUser] = useState<UsuarioRespuesta | null>(null);
    const [form, setForm] = useState<UsuarioRespuesta>({
        nombreUsuario: '',
        apellidoUsuario: '',
        emailUsuario: '',
        telefonoUsuario: '',
        numeroDocumentoUsuario: '',
        alias: ''
    } as UsuarioRespuesta);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function initializeUser() {
            try {
                const usuario = await obtenerCookie()
                if (!usuario) {
                    setErrorMsg("No autenticado");
                    setLoading(false);
                    return;
                }

                const idParam = usuario.idUsuario;
                if (!idParam) {
                    setErrorMsg("No se proporcionó el ID de usuario.");
                    setLoading(false);
                    return;
                }

                const url = `http://localhost:8080/api/usuario/private/obtenerporid/${idParam}`;
                const response = await axios.get<UsuarioRespuesta>(url, { withCredentials: true });
                setUser(response.data);
                setForm({
                    ...response.data,
                    nombreUsuario: response.data.nombreUsuario || '',
                    apellidoUsuario: response.data.apellidoUsuario || '',
                    emailUsuario: response.data.emailUsuario || '',
                    telefonoUsuario: response.data.telefonoUsuario || '',
                    numeroDocumentoUsuario: response.data.numeroDocumentoUsuario || '',
                    alias: response.data.alias || ''
                });
            } catch (err: any) {
                console.error("Error cargando perfil:", err);
                setErrorMsg("Hubo un problema cargando tu perfil.");
            } finally {
                setLoading(false);
            }
        }

        initializeUser();
    }, []);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value } as UsuarioRespuesta));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        try {
            if (!user?.idUsuario) throw new Error("ID de usuario no definido.");
            
            const payload: any = {
                nombreUsuario: form.nombreUsuario,
                apellidoUsuario: form.apellidoUsuario,
                emailUsuario: form.emailUsuario,
                telefonoUsuario: form.telefonoUsuario,
                numeroDocumentoUsuario: form.numeroDocumentoUsuario
            };
            await actualizarDatosUsuario(payload);
            console.log("Datos a actualizar:", form);

            setSuccessMsg("Perfil actualizado correctamente.");
            setEditing(false);
            
            // Recargar datos actualizados
            setLoading(true);
            try {
                const usuario = await obtenerCookie();
                if (usuario) {
                    const url = `http://localhost:8080/api/usuario/private/obtenerporid/${usuario.idUsuario}`;
                    const response = await axios.get<UsuarioRespuesta>(url, { withCredentials: true });
                    setUser(response.data);
                    setForm({
                        ...response.data,
                        nombreUsuario: response.data.nombreUsuario || '',
                        apellidoUsuario: response.data.apellidoUsuario || '',
                        emailUsuario: response.data.emailUsuario || '',
                        telefonoUsuario: response.data.telefonoUsuario || '',
                        numeroDocumentoUsuario: response.data.numeroDocumentoUsuario || '',
                        alias: response.data.alias || ''
                    });
                }
            } catch (error) {
                console.error("Error recargando datos:", error);
            } finally {
                setLoading(false);
            }
        } catch (err: any) {
            console.error("Error actualizando perfil:", err);
            setErrorMsg(err.response?.data || err.message);
        }
    }

    if (loading) {
        return (
            <SidebarInset>
                <header className="flex h-16 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Perfil</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Cargando perfil...</p>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        );
    }

    return (
        <SidebarInset>
            <header className="flex h-16 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Perfil</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {errorMsg && (
                    <Alert variant="destructive">
                        <AlertDescription>{errorMsg}</AlertDescription>
                    </Alert>
                )}
                
                {successMsg && (
                    <Alert>
                        <AlertDescription>{successMsg}</AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-6">
                    {/* Header del perfil */}
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="/images/default-avatar.png" alt="Avatar" />
                                        <AvatarFallback className="text-lg">
                                            {user?.nombreUsuario?.charAt(0)}{user?.apellidoUsuario?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-2xl">
                                            {user?.nombreUsuario} {user?.apellidoUsuario}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Shield className="h-4 w-4" />
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {user?.rolUsuario}
                                            </span>
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button
                                    variant={editing ? "outline" : "default"}
                                    onClick={() => {
                                        if (editing) {
                                            setEditing(false);
                                            setForm({
                                                ...user!,
                                                nombreUsuario: user?.nombreUsuario || '',
                                                apellidoUsuario: user?.apellidoUsuario || '',
                                                emailUsuario: user?.emailUsuario || '',
                                                telefonoUsuario: user?.telefonoUsuario || '',
                                                numeroDocumentoUsuario: user?.numeroDocumentoUsuario || '',
                                                alias: user?.alias || ''
                                            });
                                        } else {
                                            setEditing(true);
                                        }
                                    }}
                                >
                                    {editing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                                    {editing ? "Cancelar" : "Editar"}
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Información del perfil */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información Personal
                            </CardTitle>
                            <CardDescription>
                                {editing ? "Modifica tu información personal" : "Detalles de tu cuenta"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {editing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombreUsuario">Nombre</Label>
                                            <Input
                                                id="nombreUsuario"
                                                name="nombreUsuario"
                                                value={form.nombreUsuario}
                                                onChange={handleChange}
                                                placeholder="Tu nombre"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="apellidoUsuario">Apellido</Label>
                                            <Input
                                                id="apellidoUsuario"
                                                name="apellidoUsuario"
                                                value={form.apellidoUsuario}
                                                onChange={handleChange}
                                                placeholder="Tu apellido"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="emailUsuario" className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                Email
                                            </Label>
                                            <Input
                                                id="emailUsuario"
                                                type="email"
                                                name="emailUsuario"
                                                value={form.emailUsuario}
                                                onChange={handleChange}
                                                placeholder="tu@email.com"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="telefonoUsuario" className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                Teléfono
                                            </Label>
                                            <Input
                                                id="telefonoUsuario"
                                                name="telefonoUsuario"
                                                value={form.telefonoUsuario}
                                                onChange={handleChange}
                                                placeholder="+57 300 123 4567"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="numeroDocumentoUsuario" className="flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                Documento
                                            </Label>
                                            <Input
                                                id="numeroDocumentoUsuario"
                                                name="numeroDocumentoUsuario"
                                                value={form.numeroDocumentoUsuario}
                                                onChange={handleChange}
                                                placeholder="12345678"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setEditing(false);
                                                setForm({
                                                    ...user!,
                                                    nombreUsuario: user?.nombreUsuario || '',
                                                    apellidoUsuario: user?.apellidoUsuario || '',
                                                    emailUsuario: user?.emailUsuario || '',
                                                    telefonoUsuario: user?.telefonoUsuario || '',
                                                    numeroDocumentoUsuario: user?.numeroDocumentoUsuario || '',
                                                    alias: user?.alias || ''
                                                });
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button type="submit">
                                            <Save className="h-4 w-4 mr-2" />
                                            Guardar cambios
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Nombre completo</Label>
                                            <p className="text-lg">{user?.nombreUsuario} {user?.apellidoUsuario}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                Email
                                            </Label>
                                            <p className="text-lg">{user?.emailUsuario}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                Teléfono
                                            </Label>
                                            <p className="text-lg">{user?.telefonoUsuario}</p>
                                        </div>
                                        <div>
                                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <FileText className="h-4 w-4" />
                                                Documento
                                            </Label>
                                            <p className="text-lg">{user?.numeroDocumentoUsuario}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SidebarInset>
    );
}
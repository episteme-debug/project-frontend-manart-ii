"use client";
import { useState, useEffect } from "react";
import { DomiciliosCard } from "@/components/DomiciliosCard";

// 1. Define la forma de un domicilio según modelo de BD/DTO
interface Domicilio {
  id_direccion?: number; // viene del servidor una vez creado
  barrio:      string;
  ciudad:      string;
  nombre:      string;
  id_usuario:  number;
}

export default function Page() {
  const userId = 1; // 2. ID del usuario logueado (ADMIN por ejemplo)

  // 3. Estado: lista de domicilios (se carga desde la API)
  const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
  // 4. Estado: datos del formulario (inputs)
  const [form, setForm] = useState<Domicilio>({
    barrio: "", ciudad: "", nombre: "", id_usuario: userId
  });
  // 5. Estado: si estamos editando, guarda el id; si es null, estamos creando
  const [editingId, setEditingId] = useState<number | null>(null);
  // 6. Estado: controla si el formulario está visible
  const [showForm, setShowForm] = useState(false);

  // 7. Al montar el componente, pide la lista real de direcciones
  useEffect(() => {
    const url = `http://localhost:8080/api/direccion/private/listarporusuario/${userId}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("datos listar desde API:", data);
        // si recibimos un array lo usamos; si no, lo dejamos vacío
        setDomicilios(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("falló la carga de domicilios:", err);
      });
  }, [userId]);

  // 8. Cada vez que cambias un input, actualiza el estado `form`
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // 9. Al enviar el formulario: crea o actualiza según editingId
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId === null) {
      // 9.1 crear
      const res = await fetch("http://localhost:8080/api/direccion/private/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al crear");
      const nueva = await res.json();
      setDomicilios(prev => [...prev, nueva]);
    } else {
      // 9.2 actualizar
      const res = await fetch(
        `http://localhost:8080/api/direccion/private/actualizar/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar");
      const actualizada = await res.json();
      setDomicilios(prev =>
        prev.map(d =>
          d.id_direccion === editingId ? actualizada : d
        )
      );
    }
    // 10. Limpia y oculta el formulario
    setForm({ barrio: "", ciudad: "", nombre: "", id_usuario: userId });
    setEditingId(null);
    setShowForm(false);
  }

  // 11. Cuando pulsas “Editar” en una tarjeta, carga esos datos en el form
  function startEdit(d: Domicilio) {
    setForm(d);
    setEditingId(d.id_direccion!);
    setShowForm(true);
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Mis Domicilios</h1>

      {/* 12. Botón para mostrar el form cuando está oculto */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-teal-600 text-white py-2 rounded"
        >
          Agregar domicilio
        </button>
      )}

      {/* 13. Formulario: se ve solo si showForm es true */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Barrio</label>
            <input
              name="barrio"
              value={form.barrio}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ciudad</label>
            <input
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white py-2 rounded"
            >
              {editingId === null ? "Crear" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* 14. Listado de tarjetas: recorrimos domicilios */}
      <section className="space-y-4">
        {domicilios.map(d => (
          <div key={d.id_direccion} className="relative">
            <DomiciliosCard
              direccion={d.barrio}
              ciudad={d.ciudad}
              nombre={d.nombre}
            />
            <button
              onClick={() => startEdit(d)}
              className="absolute top-3 right-3 text-teal-600"
            >
              Editar
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

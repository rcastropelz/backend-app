import { useEffect, useState } from "react";

export default function PersonasCrud() {
  const [personas, setPersonas] = useState([]);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [editId, setEditId] = useState(null);

  const API = "https://backend-app.onrender.com/api/personas"; // Cambia por tu URL real

  // Cargar datos
  const fetchPersonas = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPersonas(data);
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  // Guardar o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API}/${editId}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ nombre: "", email: "", telefono: "" });
    setEditId(null);
    fetchPersonas();
  };

  // Eliminar
  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar?")) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchPersonas();
    }
  };

  // Editar
  const handleEdit = (persona) => {
    setForm({ nombre: persona.nombre, email: persona.email, telefono: persona.telefono });
    setEditId(persona.id);
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Gestión de Personas</h2>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">{p.email}</td>
              <td className="border p-2">{p.telefono}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

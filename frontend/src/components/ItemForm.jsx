import { useEffect, useState } from "react";

const emptyForm = { name: "", description: "" };

export default function ItemForm({ editingItem, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editingItem ? { name: editingItem.name, description: editingItem.description } : emptyForm);
  }, [editingItem]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del item"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="description">Descripción</label>
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción (opcional)"
        />
      </div>
      <div className="form-actions">
        <button type="submit">{editingItem ? "Guardar cambios" : "Añadir"}</button>
        {editingItem && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

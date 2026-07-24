import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm.jsx";
import ItemTable from "./components/ItemTable.jsx";
import { getItems, createItem, updateItem, deleteItem } from "./api/items.js";
import "./App.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(form) {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, form);
        setEditingItem(null);
      } else {
        await createItem(form);
      }
      await loadItems();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteItem(id);
      await loadItems();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <h1>CRUD de Itemsssss</h1>

      {error && <p className="error-banner">{error}</p>}

      <ItemForm
        editingItem={editingItem}
        onSubmit={handleSubmit}
        onCancel={() => setEditingItem(null)}
      />

      {loading ? <p>Cargando...</p> : (
        <ItemTable items={items} onEdit={setEditingItem} onDelete={handleDelete} />
      )}
    </div>
  );
}

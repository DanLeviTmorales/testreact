export default function ItemTable({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">No hay items todavía. Añade el primero con el formulario.</p>;
  }

  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td className="row-actions">
              <button type="button" onClick={() => onEdit(item)}>
                Editar
              </button>
              <button type="button" className="danger" onClick={() => onDelete(item.id)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

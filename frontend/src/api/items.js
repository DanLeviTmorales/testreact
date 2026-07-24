const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error || `Error ${res.status}`);
  }
  return data;
}

export function getItems() {
  return fetch(`${API_URL}/items`).then(handleResponse);
}

export function createItem(item) {
  return fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

export function updateItem(id, item) {
  return fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

export function deleteItem(id) {
  return fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
}

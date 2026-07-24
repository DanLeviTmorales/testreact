let items = [];
let nextId = 1;

export function resetItems() {
  items = [];
  nextId = 1;
}

export function getAllItems() {
  return items;
}

export function getItemById(id) {
  return items.find((item) => item.id === id);
}

export function createItem({ name, description }) {
  const item = { id: nextId++, name, description: description ?? "" };
  items.push(item);
  return item;
}

export function updateItem(id, { name, description }) {
  const item = getItemById(id);
  if (!item) return null;
  if (name !== undefined) item.name = name;
  if (description !== undefined) item.description = description;
  return item;
}

export function deleteItem(id) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}

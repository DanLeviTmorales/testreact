import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetItems } from "../data/items.js";

describe("CRUD /api/items", () => {
  beforeEach(() => {
    resetItems();
  });

  it("devuelve una lista vacía al inicio", async () => {
    const res = await request(app).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("crea un item nuevo", async () => {
    const res = await request(app)
      .post("/api/items")
      .send({ name: "Tarea 1", description: "Descripción de prueba" });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: 1,
      name: "Tarea 1",
      description: "Descripción de prueba",
    });
  });

  it("rechaza la creación sin nombre", async () => {
    const res = await request(app).post("/api/items").send({ description: "sin nombre" });
    expect(res.status).toBe(400);
  });

  it("obtiene un item por id", async () => {
    const created = await request(app).post("/api/items").send({ name: "Tarea 1" });
    const res = await request(app).get(`/api/items/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Tarea 1");
  });

  it("devuelve 404 al buscar un item inexistente", async () => {
    const res = await request(app).get("/api/items/999");
    expect(res.status).toBe(404);
  });

  it("actualiza un item existente", async () => {
    const created = await request(app).post("/api/items").send({ name: "Tarea 1" });
    const res = await request(app)
      .put(`/api/items/${created.body.id}`)
      .send({ name: "Tarea actualizada" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Tarea actualizada");
  });

  it("devuelve 404 al actualizar un item inexistente", async () => {
    const res = await request(app).put("/api/items/999").send({ name: "X" });
    expect(res.status).toBe(404);
  });

  it("elimina un item existente", async () => {
    const created = await request(app).post("/api/items").send({ name: "Tarea 1" });
    const res = await request(app).delete(`/api/items/${created.body.id}`);
    expect(res.status).toBe(204);

    const listRes = await request(app).get("/api/items");
    expect(listRes.body).toEqual([]);
  });

  it("devuelve 404 al eliminar un item inexistente", async () => {
    const res = await request(app).delete("/api/items/999");
    expect(res.status).toBe(404);
  });
});

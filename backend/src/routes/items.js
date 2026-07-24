import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../data/items.js";

const router = Router();

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Lista todos los items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Lista de items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", (req, res) => {
  res.json(getAllItems());
});

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Obtiene un item por id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", (req, res) => {
  const item = getItemById(Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item no encontrado" });
  res.json(item);
});

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Crea un nuevo item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "El campo 'name' es obligatorio" });
  }
  const item = createItem({ name, description });
  res.status(201).json(item);
});

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     summary: Actualiza un item existente
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Item no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  if (name !== undefined && !name.trim()) {
    return res.status(400).json({ error: "El campo 'name' no puede estar vacío" });
  }
  const item = updateItem(Number(req.params.id), { name, description });
  if (!item) return res.status(404).json({ error: "Item no encontrado" });
  res.json(item);
});

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Elimina un item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item eliminado
 *       404:
 *         description: Item no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", (req, res) => {
  const deleted = deleteItem(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Item no encontrado" });
  res.status(204).send();
});

export default router;

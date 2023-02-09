import sqlite3 from "sqlite3";
sqlite3.verbose();
import { open } from "sqlite";

const db = await open({
  filename: "./db.sqlite",
  driver: sqlite3.Database
});

import express from "express";
let api = express.Router();

api.get('/user', async (req, res) => {              //login search

  const q = "SELECT * FROM User";
  try {
    const result = await db.all(q);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.get('/shop', async (req, res) => {              //products listing
    const q = "SELECT * FROM Product";
    
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

api.delete('/items/:pk', async (req, res) => {
  if (req.params.pk == undefined) { return res.sendStatus(400); }
  let pk = parseInt(req.params.pk);
  try {
    const q = `DELETE FROM items WHERE pk = ${pk}`;
    await db.run(q);
    res.status(200).json({});
  } catch (err) {
    res.status(500).json(err);
  }
});

api.use(express.json());

api.put('/items/:pk', async (req, res) => {
  if (req.params.pk == undefined) {return res.sendStatus(400); }
  if (req.body.description == undefined
    || req.body.priority == undefined
    || req.body.completed == undefined) {
    return res.sendStatus(400);
  }
  const pk = parseInt(req.params.pk);
  const valuesUpdateProduct = {
    $pk: pk,
    $description: req.body.description,
    $priority: req.body.priority,
    $completed: req.body.completed
  }
  // todo: further checking on valid values

  const q1 = `UPDATE items SET 
        description = $description, 
        priority = $priority, 
        completed = $completed WHERE pk = $pk`;

  const q2 = "SELECT * FROM items WHERE pk = $pk";

  try {
    await db.run(q1, valuesUpdateProduct);
    let result = await db.get(q2, { $pk: pk });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.post('/items', async (req, res) => {
  if (req.body.description == undefined
    || req.body.priority == undefined
    || req.body.completed == undefined) {
    return res.sendStatus(400);
  }

  let valuesNewItem = {
    $description: req.body.description,
    $priority: req.body.priority,
    $completed: req.body.completed
    
  };
  // todo: further checking on valid values

  const q1 = `INSERT INTO items (description, priority, completed)
    VALUES ($description, $priority, $completed)`;

  const q2 = "SELECT * FROM items WHERE pk = $pk";

  try {
    const insResult = await db.run(q1, valuesNewItem);
    const pk = insResult.lastID;
    let result = await db.get(q2, { $pk: pk });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default api;
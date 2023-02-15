import sqlite3 from "sqlite3";
sqlite3.verbose();
import { open } from "sqlite";

const db = await open({
  filename: "./db.sqlite",
  driver: sqlite3.Database
});

import express from "express";
let api = express.Router();
api.use(express.json());

api.get('/user', async (req, res) => {              //login search

  const q = `SELECT * FROM User`;
  try {
    const result = await db.all(q);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.get('/user/:userID', async (req, res) => {              //personal data
  let userID = parseInt(req.params.userID)
  const q = `SELECT fName, email, address FROM User WHERE userID = $userID`;
  try {
    const result = await db.all(q, userID);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.post('/register', async (req, res) => {             //register
  if (req.body.fName == undefined
    || req.body.email == undefined
    || req.body.password == undefined
    || req.body.address == undefined) {
    return res.sendStatus(400);
  }

  let values = {
    $fName: req.body.fName,
    $email: req.body.email,
    $password: req.body.password,
    $address: req.body.address
  };

  try {
    const q = `INSERT INTO User (fName, email, password, address) VALUES ($fName, $email, $password, $address)`;

    const result = await db.run(q, values);
    var userData = { userID: result.lastID, fName: req.body.fName}
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.post('/checkPw/', async (req, res) => {  
  if (req.body.password == undefined) {return res.sendStatus(400); }
  
  if (req.body.userID == undefined) {
    const q = `SELECT * FROM User`;
    try {
      const result = await db.all(q);

      for (let x in result) {
        if (result[x].email == req.body.email && result[x].password == req.body.password) {
          var userData = { userID: result[x].userID, fName: result[x].fName }
          res.status(200).json(userData);
          return;
        }
      }
      res.status(401).json('');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    let userID = parseInt(req.body.userID)
    const q = `SELECT password FROM User WHERE userID = $userID`;
    try {
      const result = await db.all(q, userID);
      if (req.body.password == result[0].password) {
        res.status(200).json();
      } else {
        res.status(401).json();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

api.post('/cpw/:userID', async (req, res) => {              //change pw         
  if (req.params.userID == undefined) {return res.sendStatus(400); }
  if (req.body.newPassword == undefined) { return res.sendStatus(400); }

  const value = {
    $userID: req.params.userID,
    $newPassword: req.body.newPassword,
  }

  const q = `UPDATE User SET password = $newPassword WHERE userID = $userID`;

  try {
    var result = db.run(q, value);
    res.status(200).json();
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

  api.get('/purchaseOrder', async(req, res) => {         //Vendor purchase order
    const q = `SELECT status, POID, fName, totalAmount, purchaseDate FROM Purchase_Order po, User u WHERE po.userID = u.userID ORDER BY POID DESC`
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  })

export default api;
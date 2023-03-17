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

  api.get('/trolley/:userID', async (req, res) => {              //trolley personal data
    let userID = parseInt(req.params.userID)
    const q = `SELECT p.productID, name, price, quantity FROM Shopping_cart sc, Product p WHERE userID = $userID AND sc.productID = p.productID`;
    try {
      const result = await db.all(q, userID);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/trolley', async (req, res) => {              //trolley listing
    const q = `SELECT name, price, quantity FROM Shopping_cart sc, Product p WHERE sc.productID = p.productID`;
    
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

api.get('/purchaseOrder', async(req, res) => {         //Vendor purchase order
    const q = `SELECT status, POID, fName, totalAmount, purchaseDate FROM Purchase_Order po, User u WHERE po.userID = u.userID AND cancelBy IS NULL ORDER BY purchaseDate DESC`
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  })

  api.get('/shopping_cart', async (req, res) => {              //cart search

    const q = `SELECT * FROM Shopping_cart`;
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/product', async (req, res) => {             //add product to shopping cart
    if ( req.body.userID == undefined
      || req.body.productID == undefined
      || req.body.qunantity == undefined) {
      return res.sendStatus(400);
    }
  
    let values = {
      $userID: req.body.userID,
      $productID: req.body.productID,
      $qunantity: req.body.qunantity,
      $total: req.body.total
    };
    
    try {
      const q = `INSERT INTO Shopping_cart (userID, productID, quantity, total) VALUES ($userID, $productID, $qunantity, $total)`;
      const result = await db.run(q, values);

      var userData = { SCID: result.lastID, userID: req.body.userID}
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/checkSc/', async (req, res) => {      //check shopping cart item
    if ( req.body.userID == undefined
      || req.body.productID == undefined
      || req.body.qunantity == undefined) {
      return res.sendStatus(400);
    }
    
    let userID = parseInt(req.body.userID)
    const q = `SELECT productID FROM Shopping_cart WHERE userID = $userID`;
    try{
      const result = await db.all(q, userID);
      for (let x in result) {
        if (result[x].productID == req.body.productID) {
          var userData = { quantity: result[x].quantity }
          res.status(200).json(userData);
          return;
        }
      }
      
      res.status(401).json('');
    } catch (err) {
      res.status(500).json(err);
    }
    
  });
  

  api.post('/csc/:userID', async (req, res) => {              //change qunantity         
    if (req.params.userID == undefined) {return res.sendStatus(400); }
    if (req.body.productID == undefined) {return res.sendStatus(400); }
    if (req.body.qunantity == undefined) { return res.sendStatus(400); }
  
    const value = {
      $userID: req.params.userID,
      $productID: req.body.productID,
      $qunantity: req.body.qunantity,
    }
  
    const q = `UPDATE Shopping_cart SET quantity = quantity + $qunantity WHERE userID = $userID AND productID = $productID`;
  
    try {
      var result = db.run(q, value);
      res.status(200).json();
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/delitem/:userID',async(req,res)=>{
    if (req.params.userID == undefined) {return res.sendStatus(400); }
    if (req.body.productID == undefined) {return res.sendStatus(400); }

    const value = {
      $userID: req.params.userID,
      $productID: req.body.productID,
    }

    const q = 'DELETE FROM Shopping_cart WHERE productID = $productID AND userID = $userID '

    try{
      var result = db.run(q,value);
      res.status(200).json();
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/pushtopurchase/:userID', async (req,res) => { 
    if (req.params.userID == undefined) {return res.sendStatus(400); }
    if (req.body.total_amount == undefined) {return res.sendStatus(400);}
    

    const date = new Date();
    const currentDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();

    let values = {
      $userID: req.params.userID,
      $total_amount: req.body.total_amount,
      $status: 'hold',
      $purchaseDate: currentDate,
      $statusDate: currentDate,
      $cancelBy: undefined,
    };

    let value ={
      $POID: userData.POID,
      $productID: req.body.productID,
      $price: req.body.price,
      $quantity: req.body.quantity,
      $amount: undefined
    };

    try {
      const q = 'INSERT INTO Purchase_Order (userID, totalAmount, purchaseDate, status, statusDate, cancelBy) VALUES ($userID, $total_amount, $purchaseDate, $status, $statusDate, $cancelBy)';
      const q2 = 'INSERT INTO Purchase_Order_Item (POID, productID, price, quantity, amount) VALUES ($POID, $productID, $price, $quantity, $amount)';
      const result = await db.run(q, values);
      const results = await db.run(q2, value);
      var userData = { POID: result.lastID, userID: req.params.userID}
      var userDatas = { POIID: results.lastID}
      res.status(200).json(userData,userDatas);
    } catch (err) {
      res.status(500).json(err);
    }

  })

export default api;
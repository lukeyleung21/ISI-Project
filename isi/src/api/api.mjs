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

api.get('/tracking/:userID', async (req, res) => {              //Purchase tracking
  if (req.params.userID == undefined) {return res.sendStatus(400); }

  let userID = parseInt(req.params.userID)

  const q = `SELECT * FROM Purchase_Order WHERE userID = $userID ORDER BY purchaseDate DESC, POID DESC`;
  try {
    const result = await db.all(q, userID);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.get('/trackingDetailUser/:POID', async (req, res) => {              //Purchase tracking user detail
  if (req.params.POID == undefined) {return res.sendStatus(400); }

  let POID = parseInt(req.params.POID)

  const q = `SELECT po.userID, po.POID, po.purchaseDate, u.FName, u.address, po.totalAmount, po.status, po.statusDate, po.cancelBy FROM Purchase_Order po, User u WHERE po.POID = $POID AND po.userID = u.userID`;
  try {
    const result = await db.all(q, POID);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});


api.get('/trackingDetail/:POID', async (req, res) => {              //Purchase tracking product detail
  if (req.params.POID == undefined) {return res.sendStatus(400); }

  let POID = parseInt(req.params.POID)

  const q = `SELECT poi.POID, poi.POIID, poi.productID, poi.price, poi.quantity, poi.amount, p.name, p.brand, p.voltage, p.electricalPlug, p.image, p.outOfStock FROM Purchase_Order_Item poi, Product p WHERE poi.POID = $POID AND poi.productID = p.productID`;
  try {
    const result = await db.all(q, POID);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

api.get('/cancel/:POID', async (req, res) => {              //Purchase tracking status change to cancel
  if (req.params.POID == undefined) {return res.sendStatus(400); }

  let POID = parseInt(req.params.POID)
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  month = ('0' + (month + 1)).slice(-2);
  let date = dateObj.getDate();
  date = ('0' + date).slice(-2);
  const today = `${year}/${month}/${date}`;

  const q = `UPDATE Purchase_Order SET status = 'cancelled', statusDate = $today, cancelBy = 'customer' WHERE POID = $POID`;
  try {
    var result = db.run(q, today, POID);
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

  api.post('/AddProduct', async (req, res) => {              //Add product information        
    if (req.body.electricalPlug  == ''
      || req.body.name == ''
      || req.body.brand == ''
      || req.body.price == ''
      || req.body.voltage == ''
      || req.body.image == '') { return res.sendStatus(400); }
  
    let value = {
      $image: req.body.image,
      $name: req.body.name,
      $brand: req.body.brand,
      $price: req.body.price,
      $voltage: req.body.voltage,
      $electricalPlug: req.body.electricalPlug,
      $outOfStock: 'F'
    }
    
    try {
      const q = `INSERT INTO Product (name, brand, price, voltage, electricalPlug, image, outOfStock) VALUES ($name, $brand, $price, $voltage, $electricalPlug, $image, $outOfStock)`;
      const result =await db.run(q, value);
      var userData = { productID: result.lastID};

      let comment = {
        $number: '1',
        $score: '3',
        $productID: userData.productID
      };

      const q1 = 'INSERT INTO Rating(productID, score, number) VALUES ($productID, $score, $number)';
      const result1 = await db.run(q1, comment);
      var userDatas = {ratingID: result1.lastID}
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.patch('/changeStock/:productID', async(req,res) =>{
    if (req.params.productID == undefined) {return res.sendStatus(400);}
    if(req.body.outOfStock == 'T'){req.body.outOfStock = "F"}
    const value ={
      productID: parseInt(req.params.productID),
      $outOfStock : req.body.outOfStock
    }
    const q = 'UPDATE Product SET outOfStock = CASE WHEN outOfStock = "T" THEN "F" ELSE "T" END WHERE productID = ?';
    const values = [req.params.productID];
    try {
      const result = await db.run(q, values);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});
    
  api.post('/changePV/:productID', async (req, res) => {              //change product information        
    if (req.params.productID == undefined) {return res.sendStatus(400); }
    if (req.body.electricalPlug  == ''
      || req.body.item[0].name == undefined
      || req.body.item[0].brand == undefined
      || req.body.item[0].price == undefined
      || req.body.voltage == '') { return res.sendStatus(400); }
  
    const value = {
      $productID: req.params.productID,
      $name: req.body.item[0].name,
      $brand: req.body.item[0].brand,
      $price: req.body.item[0].price,
      $voltage: req.body.voltage,
      $electricalPlug: req.body.electricalPlug
    }
    const q = `UPDATE Product SET name = $name, brand = $brand, price = $price, voltage = $voltage, electricalPlug = $electricalPlug WHERE productID = $productID`;
    try {
      var result = db.run(q, value);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/product/:productID', async (req, res) => {              //ProductID
    if (req.params.productID == undefined) {return res.sendStatus(400); }
    
    let productID = parseInt(req.params.productID)
    const q = `SELECT * FROM Product WHERE productID = $productID`;
    try{
      var result = await db.all(q,productID);
      res.json(result)
    }catch(err)
    {res.status(500).json(err)}

  });

  api.get('/rate', async (req, res) => {              //rating listing
    const q = "SELECT * FROM Rating";
    
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/rate/:productID',async(req,res)=>{                        //Rating_comment
    if (req.params.productID == undefined) {return res.sendStatus(400); }
    let productID = parseInt(req.params.productID)
    const q = `SELECT * FROM Rating WHERE productID = $productID `;
    try{
      var result = await db.all(q,productID);
      res.json(result)
    }catch(err)
  {res.status(500).json(err)}
  })

    api.get('/comment/:productID',async(req,res)=>{                        //Rating_comment
    if (req.params.productID == undefined) {return res.sendStatus(400); }
    let productID = parseInt(req.params.productID)
    const q = `SELECT U.fName,C.comment,C.times FROM Comment C JOIN User U ON U.userID = C.userID WHERE C.productID = $productID `;
    try{
      var result = await db.all(q,productID);
      res.json(result)
    }catch(err)
  {res.status(500).json(err)}
  })

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
    const q = `SELECT status, POID, fName, totalAmount, purchaseDate FROM Purchase_Order po, User u WHERE po.userID = u.userID ORDER BY purchaseDate DESC, POID DESC`
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/purchaseOrderDetail/:POID', async(req, res) => {
    let POID = parseInt(req.params.POID)
    const q = "SELECT po.userID, po.POID, po.purchaseDate, u.FName, u.address, po.totalAmount, po.status, po.statusDate, po.cancelBy FROM Purchase_Order po, User u WHERE po.POID = $POID AND po.userID = u.userID";
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/ship/:POID', async (req, res) => {             //vendor Pending to Shipped
    let POID = parseInt(req.params.POID)
    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    const today = `${year}/${month}/${date}`;
    const q = `UPDATE Purchase_Order SET status = 'shipped', statusDate = $today WHERE POID = $POID`;
    try {
      const result = await db.all(q, today, POID);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/shipped/:POID', async (req, res) => {             //Add comment After vendor Pending to Shipped
    let POID = parseInt(req.params.POID)
    
    const q1 = `SELECT poi.productID, po.userID, poi.POIID FROM Purchase_Order po, Purchase_Order_Item poi WHERE po.POID = $POID AND poi.POID = $POID`;
    const q2 = `INSERT INTO Comment (productID, userID, POIID, times) VALUES ($productID, $userID, $POIID, $times)`;

    try {
      const result = await db.all(q1, POID);

      for (var x in result) {
        var value = {
          $productID: result[x].productID,
          $userID: result[x].userID,
          $POIID: result[x].POIID,
          $times: 0
        }

        const result2 = await db.all(q2, value)
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/hold/:POID', async (req, res) => {             //vendor Pending to Hold
    let POID = parseInt(req.params.POID)
    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    const today = `${year}/${month}/${date}`;
    const q = `UPDATE Purchase_Order SET status = 'hold', cancelBy = NULL, statusDate = $today WHERE POID = $POID`;
    try {
      const result = await db.all(q, today, POID);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/vcancel/:POID', async (req, res) => {             //vendor cancel
    let POID = parseInt(req.params.POID)
    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    const today = `${year}/${month}/${date}`;
    const q = `UPDATE Purchase_Order SET status = 'cancelled', statusDate = $today, cancelBy = 'vendor' WHERE POID = $POID`;
    try {
      const result = await db.all(q, today, POID);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

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
    
    const q = `UPDATE Shopping_cart SET quantity = quantity + $qunantity WHERE userID = $userID AND productID = $productID`;

    try {
      const q1 = `SELECT * FROM Shopping_cart WHERE userID = ${req.body.userID} AND productID = ${req.body.productID}`
      const r = await db.all(q1)
      if (r[0] != undefined) {
        const q2 = `UPDATE Shopping_cart SET quantity = quantity + 1 WHERE userID = ${req.body.userID} AND productID = ${req.body.productID}`
        await db.all(q2)
        res.status(200).json()
        return
      }

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
      res.status(200).json(result);
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
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/deleteShoppingcart/:userID', async (req,res) => { 
    if (req.params.userID == undefined) {return res.sendStatus(400); }

    let value = {
      $userID: req.params.userID
    };

    try{
      const q ='DELETE FROM Shopping_cart WHERE userID = $userID '
      var result = db.run(q, value);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/POID', async (req, res) => {              //trolley personal data
    const q = `SELECT MAX(POID) FROM Purchase_Order`;
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/pushtopurchase/:userID', async (req,res) => { 
    if (req.params.userID == undefined) {return res.sendStatus(400); }
    if (req.body.total_amount == undefined) {return res.sendStatus(400);}

    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    const today = `${year}/${month}/${date}`;

    let values = {
      $userID: req.params.userID,
      $total_amount: req.body.total_amount,
      $status: 'pending',
      $purchaseDate: today,
      $statusDate: today,
      $cancelBy: undefined,
    };

    try {
      const q1 = 'SELECT userID, outOfStock FROM Product p, Shopping_cart sc WHERE p.productID = sc.productID';
      const result1 = await db.all(q1);

      for(let x in result1){
        if(result1[x].outOfStock == 'T' && result1[x].userID == req.params.userID){
          values = {
            $userID: req.params.userID,
            $total_amount: req.body.total_amount,
            $status: 'hold',
            $purchaseDate: today,
            $statusDate: today,
            $cancelBy: undefined,
          };
        }
      }
      const q = 'INSERT INTO Purchase_Order (userID, totalAmount, purchaseDate, status, statusDate, cancelBy) VALUES ($userID, $total_amount, $purchaseDate, $status, $statusDate, $cancelBy)';
      const result = await db.run(q, values);

      var userData = { POID: result.lastID, userID: req.params.userID}
      
      let $POID = userData.POID;
      const q2 = 'INSERT INTO Purchase_Order_Item (POID, price, quantity, productID, amount) SELECT POID, price, quantity, sc.productID, price*quantity AS total FROM Product p, Shopping_cart sc, Purchase_Order po WHERE p.productID = sc.productID AND po.userID = sc.userID AND po.POID = $POID'
      const results = await db.run(q2,$POID);
      var userDatas = { POIID: results.lastID}

      res.status(200).json(userData);
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
      res.status(200).json(result);
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
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/deleteShoppingcart/:userID', async (req,res) => { 
    if (req.params.userID == undefined) {return res.sendStatus(400); }

    let value = {
      $userID: req.params.userID
    };

    try{
      const q ='DELETE FROM Shopping_cart WHERE userID = $userID '
      var result = db.run(q, value);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.post('/pushtopurchase/:userID', async (req,res) => { 
    if (req.params.userID == undefined) {return res.sendStatus(400); }
    if (req.body.total_amount == undefined) {return res.sendStatus(400);}
    
    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    const currentDate = `${year}/${month}/${date}`;   

    let values = {
      $userID: req.params.userID,
      $total_amount: req.body.total_amount,
      $status: 'pending',
      $purchaseDate: currentDate,
      $statusDate: currentDate,
      $cancelBy: undefined,
    };

    try {
      const q = 'INSERT INTO Purchase_Order (userID, totalAmount, purchaseDate, status, statusDate, cancelBy) VALUES ($userID, $total_amount, $purchaseDate, $status, $statusDate, $cancelBy)';
      const result = await db.run(q, values);
      var userData = { POID: result.lastID, userID: req.params.userID}
      
      let $POID = userData.POID;
      const q2 = 'INSERT INTO Purchase_Order_Item (POID, price, quantity, productID, amount) SELECT POID, price, quantity, sc.productID, price*quantity AS total FROM Product p, Shopping_cart sc, Purchase_Order po WHERE p.productID = sc.productID AND po.userID = sc.userID AND po.POID = $POID'
      const results = await db.run(q2,$POID);
      var userDatas = { POIID: results.lastID}
      
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }

  });

  api.get('/salesReport/', async (req, res) => {              //sales report
    const q = `SELECT p.productID, p.name, po.purchaseDate, SUM(poi.quantity) AS quantity, SUM(poi.amount) AS amount FROM Product p, Purchase_Order po, Purchase_Order_Item poi WHERE p.productID = poi.productID AND po.POID = poi.POID AND po.status = 'shipped' GROUP BY p.name, po.purchaseDate`;
    try {
      const result = await db.all(q);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/rcCheckT/:POID', async (req, res) => {              //rc check
    if (req.params.POID == undefined) {return res.sendStatus(400); }

    var POID = parseInt(req.params.POID)
  
    const q = `SELECT c.POIID, c.times FROM Comment c, Purchase_Order_Item poi WHERE poi.POID = $POID AND poi.POIID = c.POIID`;
    
    try {
      const result = await db.all(q, POID);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  api.get('/rcCheck/:POIID/:productID/:userID', async (req, res) => {              //rc check
    if (req.params.POIID == undefined || req.params.productID == undefined || req.params.userID == undefined) {return res.sendStatus(400); }

    let value = {
      $POIID: parseInt(req.params.POIID),
      $productID: parseInt(req.params.productID),
      $userID: parseInt(req.params.userID)
    }
  
    const q = `SELECT * FROM Comment WHERE POIID = $POIID AND productID = $productID AND userID = $userID`;
    
    try {
      const result = await db.all(q, value);
      res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  api.post('/rcSubmit/:POIID/:productID/:userID', async (req, res) => {              //rc submit  
    if (req.params.POIID == undefined || req.params.productID == undefined || req.params.userID == undefined) {return res.sendStatus(400); }
    if (req.body.rating == undefined) {return res.sendStatus(400); }

    let value1 = {
      $productID: parseInt(req.params.productID),
    }

    let value = {
      $POIID: parseInt(req.params.POIID),
      $productID: parseInt(req.params.productID),
      $userID: parseInt(req.params.userID),
      $comment: req.body.comment,
    };

    const q1 = `SELECT * FROM Rating WHERE productID = $productID`;
    const q2 = `UPDATE Rating SET score = $score, number = $number WHERE productID = $productID`;

    const q3 = `UPDATE Comment SET comment = $comment, times = 1 WHERE productID = $productID and userID = $userID and POIID = $POIID`;
    const q4 = `SELECT POID FROM Purchase_Order_Item WHERE POIID = $POIID`
  
    try { 
      var result1 = await db.all(q1, parseInt(req.params.productID));

      let value2 = {
        $score: (Math.round((parseInt(req.body.rating) + result1[0].score * result1[0].number) / (result1[0].number + 1) * 10) / 10),
        $number: (result1[0].number + 1),
        $productID: parseInt(req.params.productID)
      }
      
      const q2 = `UPDATE Rating SET score = $score, number = $number WHERE productID = $productID`;
      var result2 = await db.run(q2, value2);
      
      var result3 = await db.run(q3, value);
      var result4 = await db.all(q4, parseInt(req.params.POIID))
      res.json(result4)
    } catch (err) {
      res.status(500).json(err);
    }
  });



export default api;
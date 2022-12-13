const express = require("express");
const productController = require('../controllers/productController');
const router = express.Router();
const upload = require('../middleware/upload');  


require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/', authenticateToken, productController.products);
router.get('/seller/:id', authenticateToken, productController.seller_products);

router.post('/', authenticateToken, upload, productController.product_add);
router.get('/:id',authenticateToken, productController.product_by_ID);

router.patch('/:id', authenticateToken, productController.product_update);
router.delete('/:id',authenticateToken, productController.product_delete);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.json({ status: 401, msg: "Unauthorized"});
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      console.log(err)
      if(err) return res.json({ status: 403, msg: err.message });
      req.id = id
      next()
    })
  }

module.exports = router;
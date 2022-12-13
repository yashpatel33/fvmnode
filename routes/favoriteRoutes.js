const express = require("express");
const favoriteController = require('../controllers/favoriteController');
const router = express.Router();


require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/:id',authenticateToken, favoriteController.favorite_by_seller);
router.post('/',authenticateToken, favoriteController.favorite_add);
router.delete('/:id',authenticateToken, favoriteController.favorite_delete);

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
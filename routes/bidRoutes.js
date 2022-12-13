const express = require("express");
const bidController = require('../controllers/bidController');
const router = express.Router();


require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/buyer',authenticateToken, bidController.bid_find_buyer);
router.get('/all',authenticateToken, bidController.bids);
router.get('/:id',authenticateToken, bidController.bid_by_ID);
router.post('/',authenticateToken, bidController.bid_add);
router.delete('/:id',authenticateToken, bidController.bid_delete);

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
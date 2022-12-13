const express = require("express");
const locationController = require('../controllers/locationController');
const router = express.Router();


require('dotenv').config()
const jwt = require('jsonwebtoken')


router.get('/', authenticateToken, locationController.locations);
router.get('/:id', authenticateToken, locationController.location_by_ID);
router.post('/', authenticateToken, locationController.location_add);
router.patch('/:id', authenticateToken, locationController.location_update);
router.delete('/:id', authenticateToken, locationController.location_delete);

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
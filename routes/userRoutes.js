const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

require('dotenv').config()
const jwt = require('jsonwebtoken')

router.get('/all', userController.users);
router.get('/otp', userController.user_sendOTP);
router.post('/',  userController.user_register);
router.get('/', userController.user_login);

router.delete('/', userController.user_delete);
router.patch('/', userController.user_update_password);
router.patch('/update/:id', authenticateToken, userController.user_update);


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

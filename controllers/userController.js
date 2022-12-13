const User = require('../models/user');
const Util = require('../Util/Util');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const { result } = require('lodash');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

let OTP = 000000;

const users = (req, res) => {
  console.log("users");

  User.find().sort({ createdAt: -1 })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    });
}



const user_update = async (req, res) => {

  if (req.body.password != undefined) {
    User.findById(req.params.id).then(result => {

      if (result != null && result.length != 0) {
        // if (req.body.password != result.password) {
        //   res.json({ status: 300, msg: "Incorrect old password" });
        //   return;
        // }
        User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
          .then(result => {
            if (result != null && result.length != 0) {
              const accessToken = jwt.sign(result.id, process.env.ACCESS_TOKEN_SECRET);
              res.json({ status: 200, accessToken: accessToken, data: result });
            }
            else
              res.json({ status: 300, msg: 'User not found' });
          })
          .catch(err => {
            res.json({ status: 400, msg: 'Somthing wrong to update profile' });
            console.log(err);
          });

      } else
        res.json({ status: 300, msg: "No user found" });
    })
      .catch(err => {
        res.json({ status: 400, msg: err.message });
      });
  }else{
    
    User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(result => {
      if (result != null && result.length != 0) {
        const accessToken = jwt.sign(result.id, process.env.ACCESS_TOKEN_SECRET);
        res.json({ status: 200, accessToken: accessToken, data: result });
      }
      else
        res.json({ status: 300, msg: 'User not found' });
    })
    .catch(err => {
      res.json({ status: 400, msg: 'Somthing wrong to update profile' });
      console.log(err);
    });

  }




}


const user_login = (req, res) => {

  User.findOne({ email: req.body.email }).then(result => {
    if (result != null && result.length != 0) {
      if (req.body.password != result.password) {
        res.json({ status: 300, msg: "Wrong email or/and passowrd" });
        return;
      }
      const accessToken = jwt.sign(result.id, process.env.ACCESS_TOKEN_SECRET);
      res.json({ status: 200, accessToken: accessToken, data: result });
    } else
      res.json({ status: 300, msg: "No user found with give email" });
  })
    .catch(err => {
      res.json({ status: 400, msg: err.message });
    });
}



const user_register = (req, res) => {
  console.log("Register");

  const user = new User(req.body);

  User.findOne({ email: req.body.email }).then(result => {
    if (result != null && result.length != 0) {
      res.json({ status: 300, msg: "This email is already in use" });
    } else {
      user.save()
        .then(result => {
          res.json({ status: 200, data: result });
        })
        .catch(err => {
          res.json({ status: 400, msg: err.message })
          console.log(err);
        });
    }
  })
    .catch(err => {
      res.json({ status: 400, msg: err.message });
    });



}



const user_delete = (req, res) => {
  console.log("delete");

  User.findByIdAndDelete(req.body.id)
    .then(result => {
      if (result != null && result.length != 0)
        res.json({ status: 200, msg: 'User deleted successfully' });
      else
        res.json({ status: 300, msg: 'User not found' });
    })
    .catch(err => {
      res.json({ status: 400, msg: err.message });
      console.log(err);
    });
}


const user_sendOTP = (req, res) => {

  User.findOne(req.body).then(result => {
    if (result != null && result.length != 0) {
      mailHandler(req.body.email, function (bl) {
        if (bl)
          res.json({ status: 200, msg: 'Please check your email for OTP' })
        else
          res.json({ status: 400, msg: 'Somthing wrong to reset password please contact customer care advisor' });
      })
    } else
      res.json({ status: 300, msg: "No user found with given mail: " + req.body.email });
  })
    .catch(err => {
      res.json({ status: 400, msg: "Error : " + err.message });
    });
}


const user_update_password = async (req, res) => {
  console.log(req.body);

  if (req.body.otp == OTP){
    User.findOne({email: req.body.email}).then(result => {
      if (result != null && result.length != 0) {
       
      User.findByIdAndUpdate(result.id, { password: req.body.password }, { useFindAndModify: false })
        .then(result => {
          console.log("updatepassword "+result );
  
          if (result != null && result.length != 0) {
            OTP = 000000
            res.json({ status: 200, msg: 'Password reset successfully' })
          }
          else
            res.json({ status: 300, msg: 'User not found' });
        })
        .catch(err => {
          res.json({ status: 400, msg: 'Somthing wrong to reset password please contact customer care advisor' });
          console.log(err);
        });
  
      } else
        res.json({ status: 300, msg: "No user found with given mail: " + req.body.email });
    })
      .catch(err => {
        res.json({ status: 400, msg: "Error : " + err.message });
      });
  }
  else
   { res.json({ status: 201, msg: 'Wrong OTP' });
  }
}


async function mailHandler(email, returnData) {
  OTP = Math.floor(100000 + Math.random() * 900000);

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  }));

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'FVM verification',
    html: "<center>Your verification code for FVM : <h2>" + OTP + "</h2><center>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return returnData(false);
    } else {
      return returnData(true);
    }
  });
}


module.exports = {
  users,
  user_sendOTP,
  user_login,
  user_register,
  user_delete,
  user_update_password,
  user_update
}
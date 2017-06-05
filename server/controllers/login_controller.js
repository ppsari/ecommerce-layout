let helper = require('../helper/util');
const Customer = require('../models/customers');
const mongoose = require('mongoose');

const login = (req,res) => {
  if (typeof req.body.email !== undefined)
  Customer.findOne({email:req.body.email}, (err,user)=>{
    // console.log(req.body.email)
    if (err || user === null) res.send({err:'Invalid Customer'})
    else if (user !== null) {
      let user_dt = {
        username : user.username,
        email: user.email,
        id : user._id
      };
      if (helper.checkPassword(req.body.password,user.password)) {
        let token = helper.createToken(user_dt);
        // res.setHeader('token',`${token}`);
        res.send(`${token}`);
      }
      else res.send('false');
    }
  });
  else res.send('isi email')
}

const register = (req,res) => {
  let user_data = {};
  user_data.username = req.body.username;
  user_data.email = req.body.email;
  user_data.password = req.body.password;
  let newuser = new Customer(user_data);
  newuser.save((err,user)=>{
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';
      // console.log(err);
      if (err.code == 11000) err_msg+= `Email exist`;
      res.send({err:err_msg});
    } else {
      // console.log('eh kog scs')
      user.save((err_hash,user)=>{
        if (err_hash) res.send('Hash password failed');
        else res.send(`[SUCCESS][INSERT] ${user._id} inserted`);
      })
    };
  })
}

module.exports = {
  login,
  register
}
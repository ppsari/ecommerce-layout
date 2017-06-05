const helper = require('../helper/util.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bukusaya');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    username: {
      type : String,
      lowercase: true,
      validate: {
        validator: function(val){ return /[a-z]{3}/gi.test(val) },
        message: `{PATH} must be alphabet with min length 3 characters`
      },
      required: [true, `{PATH} must be filled`]
    },
    password: {
      type : String,
      validate: {
        validator: function(val){ return /.{10,20}/.test(val)},
        message: `{PATH}'s length must be between 10 and 20 char`
      },
      required: [true, `{PATH} must be filled`]
      // ,set: helper.hashPassword
    },
    email: {
      type : String,
      lowercase:true,
      validate: {
        validator: function(val) {return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val)},
        message: `{PATH} invalid`
      },
      unique: true,
      required: [true, `{PATH} must be filled`]
    }
  });

// customerSchema.index({ email: 1 }, { unique: true });

customerSchema.pre('save', function(next) {
  this._doc.password = helper.hashPassword(this._doc.password);
  next();
});

let Customer = mongoose.model('customer',customerSchema);

module.exports = Customer;
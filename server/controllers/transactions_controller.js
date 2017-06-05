const mongoose = require('mongoose');

// const ObjectID = require("mongodb").ObjectID;
// mongoose.connect('mongodb://localhost/library');
let Transaction = require('../models/transactions');
let Book = require('../models/books');
let helper = require('../helper/util.js')

const listTransaction = (req,res) => {
  Transaction.find().populate('booklist')
  .exec((err,transaction)=> {res.send(err? err : transaction);})
}

const findOneTransaction = (req,res) => {
  Transaction.findOne(
    {_id: (req.params.id)}
  ).populate('booklist')
  .exec((err,transaction)=> {res.send(err? err : transaction);})
}

const updateTransaction = (req,res) => {
  Transaction.findOne(
    {_id: (req.params.id)},
    (err,transaction)=>{
      if (!err) {
        if (typeof req.body.days !== 'undefined' && req.body.days !=='') transaction.days = req.body.days;
        if (typeof req.body.memberid !== 'undefined' && req.body.memberid !=='') transaction.memberid = req.body.memberid;
        transaction.in_date  = new Date();// new Date('2017-05-27T09:50:13.727Z');
        if (transaction.due_date < transaction.in_date ) {
          let diff = Math.ceil( (transaction.in_date - transaction.due_date) / (1000 * 3600 * 24));
          let fine  = diff * 500 * transaction.booklist.length;
          transaction.fine =  fine;
        }
        if (typeof req.body.fine !== 'undefined' && req.body.fine !=='') transaction.fine = req.body.fine;
        transaction.save( (err,trans)=>{  res.send(err? err : `${trans._id} sudah dikembalikan` );});

      }
    }
  )
}

const destroyTransaction = (req,res) => {
  Transaction.remove({_id:(req.params.id)}, (err,result) => {
    res.send(err? err : `Transaction sudah dihapus` );
  })
}



const insertTransaction = (req,res) => {

  if (typeof req.body.memberid !== 'undefined' && req.body.memberid !=='')
    helper.getUserId( req.body.memberid, (err,user)=> {
      console.log(req.body);
      if (!err) {
        let transaction = {};
        if (typeof req.body.total !== 'undefined' && req.body.total !=='') transaction.total = req.body.total;
        if (typeof req.body.bookList !== 'undefined') transaction.bookList = req.body.bookList;
        if (typeof req.body.total !== 'undefined' && req.body.total !=='') transaction.total = parseInt(req.body.total);
        transaction.memberid = user._id;
        let newTransaction = new Transaction(transaction);
        newTransaction.save((err,newtransaction)=> {
          res.send(err? {err:err} : `${newtransaction._id} sudah dimasukan` );
        });
        req.body.bookList.forEach( (bl)=>{
          Book.findById(bl.item, (err,book) => {
            if(!err) {
              book.stock =  book.stock - bl.qty;
              book.save( (err,updatedbook) =>{console.log(updatedbook)});
              res.send('Success');
            }
            else res.send({err:err})
          });
        });
      } else res.send({err:'Invalid User'})

    })
  else res.send({err:'please login'})
}

module.exports = {
  listTransaction,
  findOneTransaction,
  updateTransaction,
  destroyTransaction,
  insertTransaction
}
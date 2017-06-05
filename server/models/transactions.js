const mongoose = require('mongoose');
mongoose.connect('monggodb://localhost:3000/bukusaya');
const Schema = mongoose.Schema;
let transactionSchema = new Schema({
  memberid: String,
  total:Number,
  bookList: [
    {
      book: [{type:Schema.Types.ObjectId, ref:'Book'}],
      qty: Number,
      grandTotal: Number
    }],
});

let Transaction = mongoose.model('Transaction',transactionSchema);
module.exports = Transaction
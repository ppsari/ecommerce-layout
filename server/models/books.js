const mongoose = require('mongoose');
mongoose.connect('monggodb://localhost/library');
const Schema = mongoose.Schema;
let bookSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  img: String,
  stock: Number,
  price: Number
});

let Book = mongoose.model('Book',bookSchema);

module.exports = Book
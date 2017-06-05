const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
let app = express();

const index = require('./routes');
const books = require('./routes/books');
const transactions = require('./routes/transactions');
// const login = require('./routes/login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/books',books);
app.use('/transactions',transactions);
app.use('/',index);

app.listen(3000,()=>{console.log('server is listening at port 3000')});
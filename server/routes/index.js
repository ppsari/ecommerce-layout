const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login_controller');

/* USER
  get     /login      -> showpage login
  get     /register   -> showpage register
  get     /logout     -> doLogout
  post    /login      -> doLogin
  post    /register   -> doRegister
*/

router.post('/login',login_controller.login);
router.post('/register',login_controller.register);

module.exports = router;

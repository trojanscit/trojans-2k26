const express = require('express');
const router = express.Router();
const { signInUser } = require('../controllers/userController');

router.post('/signin', signInUser);

module.exports = router;
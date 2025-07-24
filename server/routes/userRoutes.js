const express = require('express');
const router = express.Router();

const { validateUser, registerUser } = require('../controllers/userController');

router.post('/validate', validateUser);
router.post('/register', registerUser);

module.exports = router;


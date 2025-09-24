const express = require('express');
const router = express.Router();

const {getUsers, getUserById, addUser, updateUser, deleteUser, validateUser, registerUser } = require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/validate', validateUser);
router.post('/register', registerUser);

module.exports = router;


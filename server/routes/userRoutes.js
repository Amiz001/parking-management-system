const express = require('express');
const router = express.Router();

const {getUsers, getUserById, deleteDeleteRequest, getDeleteRequestById, updateProfile, addDeleteRequest, getDeleteRequests, updateDeleteRequestStatus, addUser, updateUser, deleteUser, validateUser, registerUser, verifyEmail, verifyCode, setPassword, getUserByEmail, verifyPassword } = require('../controllers/userController');

router.get('/delete-req', getDeleteRequests);
router.delete('/delete-req/:id', deleteDeleteRequest);
router.get('/delete-req/:id', getDeleteRequestById);     
router.patch('/reset-password/:id', setPassword);
router.post('/verify-email', getUserByEmail);
router.post('/delete-req', addDeleteRequest);
router.put('/update-profile/:id', updateProfile);
router.post('/verify', verifyEmail);
router.post('/verify-code', verifyCode);
router.post('/verify-password', verifyPassword);
router.post('/validate', validateUser);
router.post('/register', registerUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);
router.patch('/:id', updateDeleteRequestStatus);
router.post('/', addUser);
router.put('/:id', updateUser);
router.get('/', getUsers);

module.exports = router;


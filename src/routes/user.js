const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authM = require('../middlewares/auth.middleware');

router.post('/', authM, userController.createUser);
router.post('/admin', userController.createAdmin);
router.get('/', authM, userController.getAllUsers);
router.get('/:id_or_mail', authM, userController.getUserByIdOrMail);
router.put('/:id', authM, userController.updateUser);
router.delete('/:id', authM, userController.deleteUser);
router.post('/register', userController.register);
router.post('/login', userController.login);
module.exports = router;

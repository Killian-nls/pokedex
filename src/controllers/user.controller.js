const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const userService = new UserService();

exports.createUser = async (req, res) => {
    if (await !isAdmin(req.auth.userId)) {
        return res.status(403).json({ error: 'You are not allowed to create a user' });
    }
    const { firstname, lastname, role, email, password } = req.body;
    const result = await userService.createUser(firstname, lastname, role, email, password);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(201).json(result);
}

exports.createAdmin = async (req, res) => {
    // if (await !isAdmin(req.auth.userId)) {
    //     return res.status(403).json({ error: 'You are not allowed to create an admin' });
    // }
    const { firstname, lastname, email, password } = req.body;
    const result = await userService.createUser(firstname, lastname, 'admin', email, password);
    console.log(result);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(201).json(result);
}

exports.getAllUsers = async (req, res) => {
    if (await !isAdmin(req.auth.userId)) {
        return res.status(403).json({ error: 'You are not allowed to get all users' });
    }
    const result = await userService.getAllUsers();
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(200).json(result);
}

exports.getUserByIdOrMail = async (req, res) => {
    const id_or_mail = req.params.id_or_mail;
    let result;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id_or_mail)) {
        result = await userService.getUserByMail(id_or_mail);
    } else {
        result = await userService.getUserById(id_or_mail);
    }
    if (result.error) {
        return res.status(500).json(result);
    }
    if (result._id !== req.auth.userId && await !isAdmin(req.auth.userId)) {
        //Ne pas envoyer les données sensibles
        return res.status(200).json({
            'firstname': result.firstname,
            'lastname': result.lastname,
        });
    }
    return res.status(200).json(result);
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    if (id !== req.auth.userId && await !isAdmin(req.auth.userId)) {
        return res.status(403).json({ error: 'You are not allowed to update this user' });
    }
    const { firstname, lastname, role, email, password } = req.body;
    const result = await userService.updateUser(id, firstname, lastname, role, email, password);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(200).json(result);
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    if (id !== req.auth.userId && await !isAdmin(req.auth.userId)) {
        return res.status(403).json({ error: 'You are not allowed to delete this user' });
    }
    const result = await userService.deleteUser(id);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(200).json(result);
}

exports.register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const result = await userService.createUser(firstname, lastname, 'user', email, password);
    if (result.error) {
        return res.status(500).json(result);
    }
    return res.status(201).json(result);
}

exports.login = async (req,res)=> {
    const result = await userService.login(req.body.email, req.body.password)
    console.log(req.body);
    if (result.error) {
        return res.status(400).send(result);
    }
    return res.status(200).send({
        message: result.message,
        userId: result.userId,
        token: jwt.sign(
            { userId: result.userId },
            process.env.TOKEN_SECRET,
            { expiresIn: '4h' }
        )
    });
}

async function isAdmin(userId) {
    const userRole = await userService.getRole(userId);
    if (userRole === 'admin') {
        return true;
    }
    return false;
}
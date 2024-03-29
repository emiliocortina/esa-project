const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/users.controller');

router.post('/login', ctrl.login);
router.post('/signup', ctrl.signup);
router.post('/signout', ctrl.logout);
router.get('/user/:id', ctrl.findUserById);

module.exports = router;

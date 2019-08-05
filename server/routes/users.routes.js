const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/users.controller');

router.post('/login', ctrl.login);
router.post('/signup', ctrl.signup);
router.post('/sigout', ctrl.logout);

module.exports = router;

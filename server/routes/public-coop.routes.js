const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/coop.controller');

router.get('/coop/:id', ctrl.getCoop);

module.exports = router;

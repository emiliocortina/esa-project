const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/topic.controller');

router.post('/topic', ctrl.createTopic);

module.exports = router;

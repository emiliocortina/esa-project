const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/topic.controller');

router.post('/topic', ctrl.createTopic);
router.get('/topic/:id', ctrl.findTopicById);
router.patch('/topic/:id', ctrl.modifyTopic);

module.exports = router;

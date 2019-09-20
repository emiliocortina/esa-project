const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/feedback.controller');

router.post('/pushFeedback', ctrl.pushFeedback);
router.post('/collectFeedback', ctrl.retrieveFeeback);

module.exports = router;

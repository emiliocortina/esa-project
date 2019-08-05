const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/events.controller');

router.get('/event/:id',ctrl.getEventById)
router.post('/event',ctrl.createEvent)
router.delete('/event/:id',ctrl.deleteEvent)
router.patch('/event/:id',ctrl.updateEvent)
router.get('/event/?start&end',ctrl.getEventsInRange)

module.exports = router;

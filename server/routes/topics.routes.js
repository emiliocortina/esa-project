const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/topic.controller');

/**
 * @api {post} /api/private/topic Creates a topic
 * @apiName PostTopic
 * @apiGroup Topic
 * 
 * @apiParamExample {json} Create topic example:
 *  {
 * 
 *  
 *	    "title":"Topic title",
 *	    "text_content":"Topic content",
 *      "comments":[]
 * 
 * 
 *  }
 */
router.post('/topic', ctrl.createTopic);
router.get('/topic/:id', ctrl.findTopicById);
router.patch('/topic/:id', ctrl.modifyTopic);
router.delete('/topic/:id', ctrl.deleteTopic);
router.get('/topicsByDate', ctrl.findTopicsPaginatedByDateDescending);

module.exports = router;

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/thread.controller');

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
router.get('/thread/:id', ctrl.findThreadById);
router.get('/threadsByDate', ctrl.findThreadsPaginatedByDateDescending);

module.exports = router;

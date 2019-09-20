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
router.get('/threads', ctrl.findThreadsPaginated);
router.get('/threadsByAuthorEmail', ctrl.findThreadsPaginatedByAuthorEmail);

module.exports = router;

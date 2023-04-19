const express = require('express');
const router = express.Router();
const queryController = require('../controllers/query.controller')
const auth = require('../middlewares/auth')

router.get('/posts/:id/comment', auth, queryController.findLatestComments)
router.get('/users/', queryController.searchUsernames)

module.exports = router;
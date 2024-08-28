const express = require('express');
const router = express.Router();
const { handlePostback } = require('../controllers/postbackController');

router.get('/appsFlyerPostback', handlePostback);

module.exports = router;

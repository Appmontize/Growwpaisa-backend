const express = require('express');
const router = express.Router();
const { generateClickId } = require('../controllers/clickController');

router.post('/generate', generateClickId);

module.exports = router;

const express = require('express');
const { getWallet, updateCoins } = require('../controllers/walletController');
const router = express.Router();
const {Wallet} = require('../models');
router.get('/:user_id', getWallet);
router.post('/update', updateCoins);

module.exports = router;

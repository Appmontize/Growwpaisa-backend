// routes/campaignRoutes.js
const express = require('express');
const { createCampaign, fetchAllCampaigns, updateCampains, deleteCampaign } = require('../controllers/campaignController');
const router = express.Router();

router.post('/create', createCampaign);
router.delete('/campaigns/:id', deleteCampaign);
router.put('/campaign/:id',updateCampains);
router.get("/fetch", fetchAllCampaigns);
module.exports = router;

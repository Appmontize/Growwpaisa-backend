// controllers/campaignController.js
const { compareSync } = require('bcrypt');
const { Campaign } = require('../models');

const createCampaign = async (req, res) => {
    try {
      console.log(req.body); // Log the request body
      const { title, text, link, image, coins, active} = req.body;
      const newCampaign = await Campaign.create({ title, text, link, image, coins, active });
      res.status(201).json(newCampaign);
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).json({ error: 'Failed to create campaign' });
    }
  };

  const fetchAllCampaigns = async (req, res) =>{
    try {
        console.log(req.body);
        const campaigns = await Campaign.findAll();
        res.json(campaigns);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch campaigns' });
       
      }
  }
  
  const updateCampains = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, link, image, coins, active } = req.body;
        const campaign = await Campaign.findByPk(id);
        if (!campaign) {
          return res.status(404).json({ error: 'Campaign not found' });
        }
        await campaign.update({ title, text, link, image, coins, active });
        res.json(campaign);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update campaign' });
      }
  }

 const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const campaign = await Campaign.findByPk(id);
        if (!campaign) {
          return res.status(404).json({ error: 'Campaign not found' });
        }
        await campaign.destroy();
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete campaign' });
        
      }
  }

  module.exports = {createCampaign, fetchAllCampaigns, updateCampains, deleteCampaign};
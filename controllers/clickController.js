const { Click } = require('../models');
const { v4: uuidv4 } = require('uuid');

const generateClickId = async (req, res) => {
  const { user_id, campaign_id } = req.body;

  if (!user_id || !campaign_id) {
    return res.status(400).json({ message: 'User ID and Campaign ID are required' });
  }

  try {
    console.log('Generating Click ID for user:', user_id, 'and campaign:', campaign_id);
    const click_id = uuidv4();
    const newClick = await Click.create({ click_id, user_id, campaign_id });

    console.log('Click ID created:', newClick);
    res.status(201).json({ click_id });
  } catch (error) {
    console.error('Error generating click ID:', error);
    res.status(500).json({ message: 'Error generating click ID', error: error.message });
  }
};

module.exports = { generateClickId };

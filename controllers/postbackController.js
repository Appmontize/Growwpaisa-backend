const { Wallet, Click, Campaign } = require('../models');

const handlePostback = async (req, res) => {
  const { af_tranid, click_id } = req.query;

  if (!af_tranid || !click_id) {
    return res.status(400).json({ status: 'failure', message: 'Missing parameters' });
  }

  try {
    const click = await Click.findOne({ where: { click_id }, include: Campaign });

    if (click) {
      const coins = click.Campaign.coins; // Get the coins value from the associated campaign
      await rewardUser(click.user_id, coins);
      return res.status(200).json({ status: 'success' });
    } else {
      return res.status(404).json({ status: 'failure', message: 'Click ID not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'failure', message: 'Internal server error' });
  }
};

const rewardUser = async (user_id, coins) => {
  const wallet = await Wallet.findOne({ where: { user_id } });

  if (wallet) {
    wallet.coins += coins; // Reward the user with the coins from the campaign
    await wallet.save();
  } else {
    // If the wallet doesn't exist, create one
    await Wallet.create({ user_id, coins });
  }
};

module.exports = { handlePostback };

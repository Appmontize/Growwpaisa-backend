const axios = require('axios');
const { Wallet, Click, Campaign } = require('../models');

const handlePostback = async (req, res) => {
  const { tid } = req.query; // Extract tid from the frontend request

  if (!tid) {
    return res.status(400).json({ status: 'failure', message: 'Missing tid parameter' });
  }

  try {
    // Find the click record in the database with the associated campaign
    const click = await Click.findOne({ where: { click_id: tid }, include: Campaign });

    if (click) {
      const coins = click.Campaign.coins; // Get the coins value from the associated campaign
      await rewardUser(click.user_id, coins);

      // Fire postback to the given URL with tid as a parameter
      const postbackUrl = `http://paychat.fuse-cloud.com/pb?tid=${encodeURIComponent(tid)}`;

      try {
        const response = await axios.get(postbackUrl);
        console.log("Postback fired: ", response.data);
      } catch (error) {
        console.error("Error firing postback: ", error);
      }

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

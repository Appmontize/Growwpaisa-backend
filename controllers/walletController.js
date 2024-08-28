const { Wallet } = require('../models');

exports.getWallet = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Try to find the wallet associated with the user_id
    let wallet = await Wallet.findOne({ where: { user_id } });

    // If no wallet is found, create one
    if (!wallet) {
      wallet = await Wallet.create({ user_id, coins: 0 }); // Initialize with 0 coins
    }

    // Respond with the wallet data
    res.status(200).json({ wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateCoins = async (req, res) => {
  const { user_id, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { user_id } });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    wallet.coins += amount;
    
    await wallet.save();

    res.status(200).json({ message: 'Coins updated', wallet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



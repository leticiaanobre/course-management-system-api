const User = require('../models/user.js');
const moment = require('moment-timezone');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedCreatedAt = moment(user.created_at).tz(clientTimezone).format();
    res.json({ ...user.toJSON(), created_at: adjustedCreatedAt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
};

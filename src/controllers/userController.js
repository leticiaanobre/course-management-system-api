const User = require('../models/user.js');
const moment = require('moment-timezone');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({error: "Name, email and password are required."});
    }

    const existingUser = await User.findOne({ where: {email}});
    if(existingUser) {
      return res.status(400).json({error: "Email already exists."})
    }

    const user = await User.create({name, email, password});
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: moment(user.created_at).tz('UTC').format()
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"Internal server error."})
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    //fuso horário do cliente
    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedCreatedAt = moment(user.created_at).tz(clientTimezone).format();
    
    res.json({ 
      id: user.id,
      name: user.email,
      email: user.email,
      created_at: adjustedCreatedAt,
      message: "User data retrived successively."
     });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createUser,
  getUser,
};

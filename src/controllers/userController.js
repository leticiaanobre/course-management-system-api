const User = require('../models/user.js');
const Enrollment = require('../models/enrollment.js');
const Course = require('../models/course.js');
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
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Enrollment, as: 'Enrollments',
          include: [
            {
              model: Course, 
              as: 'EnrolledCourse'
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedCreatedAt = moment(user.created_at).tz(clientTimezone).format('YYYY-MM-DD, HH:mm:ss');
    
    const enrollments = user.Enrollments.map(enrollment => ({
      id: enrollment.id,
      course: {
        id: enrollment.EnrolledCourse.id,
        name: enrollment.EnrolledCourse.title,
      },
      enrolled_at: moment(enrollment.enrolled_at).tz(clientTimezone).format('YYYY-MM-DD, HH:mm:ss'),
    }));

    res.json({ 
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: adjustedCreatedAt,
      enrollments: enrollments,
      message: "User data retrieved successfully."
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Internal server error." ,
      details: error.message
    });
  }
};

module.exports = {
  createUser,
  getUser,
};

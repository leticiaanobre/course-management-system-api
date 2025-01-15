const Course = require('../models/course.js');
const moment = require('moment-timezone');

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedCourses = courses.map(course => ({
      ...course.toJSON(),
      created_at: moment(course.created_at).tz(clientTimezone).format(),
    }));
    res.json(adjustedCourses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
};

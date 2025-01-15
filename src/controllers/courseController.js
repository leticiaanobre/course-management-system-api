const Course = require('../models/course.js');
const moment = require('moment-timezone');

const createCourse = async (req, res) => {
  try {
    const {title, description, hours} = req.body;

    if (!title || !description || !hours) {
      return res.status(400).json({error: "All fields are required"})
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      message: 'Course created successfully.',
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
        hours: course.hours,
        created_at: moment(course.created_at).format(),
      }
    });
  } catch (error) {
    res.status(450).json({ 
      error: 'Internal server error.',
      details: error.message,
     });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();

    if(courses.length ===0) {
      return res.status(404).json({error: 'No courses found.'})
    }
    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedCourses = courses.map(course => ({
      ...course.toJSON(),
      created_at: moment(course.created_at).tz(clientTimezone).format(),
    }));
    res.json(adjustedCourses);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
};

const Enrollment = require('../models/enrollment.js');
const Course = require('../models/course.js');
const moment = require('moment-timezone');

const createEnrollment = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({
        error: 'Both user_id and course_id are required.',
      });
    }

    const enrollment = await Enrollment.create(req.body);

    res.status(201).json({
      message: 'Enrollment created successfully.',
      enrollment: {
        id: enrollment.id,
        user_id: enrollment.user_id,
        course_id: enrollment.course_id,
        enrolled_at: moment(enrollment.created_at).format(),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required.',
      });
    }

    const enrollments = await Enrollment.findAll({
      where: { user_id: req.params.userId },
      include: [{ model: Course, as: 'Course' }],
    });

    if (enrollments.length === 0) {
      return res.status(404).json({ message: 'No enrollments found for this user.' });
    }

    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedEnrollments = enrollments.map(enrollment => ({
      id: enrollment.id,
      user_id: enrollment.user_id,
      course: enrollment.Course, 
      enrolled_at: moment(enrollment.enrolled_at).tz(clientTimezone).format(),
    }));
    res.json(adjustedEnrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEnrollment,
  getUserEnrollments,
};

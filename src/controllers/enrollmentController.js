const Enrollment = require('../models/enrollment.js');
const Course = require('../models/course.js');
const moment = require('moment-timezone');

const createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: req.params.userId },
      include: [{ model: Course }],
    });
    const clientTimezone = req.query.timezone || 'UTC';
    const adjustedEnrollments = enrollments.map(enrollment => ({
      ...enrollment.toJSON(),
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

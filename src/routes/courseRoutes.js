const express = require('express');
const { createCourse, getCourses } = require('../controllers/courseController.js');

const router = express.Router();

router.post('/', createCourse);
router.get('/', getCourses);

module.exports = router;

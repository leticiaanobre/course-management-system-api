const express = require('express');
const { createEnrollment, getUserEnrollments } = require('../controllers/enrollmentController.js');

const router = express.Router();

router.post('/', createEnrollment);
router.get('/:userId', getUserEnrollments);

module.exports = router;

const express = require('express');
const { createUser, getUser } = require('../controllers/userController.js');

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);

module.exports = router;

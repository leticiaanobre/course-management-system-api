const express = require('express');
const { createUser, getUser, getAllUsers } = require('../controllers/userController.js');

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

module.exports = router;

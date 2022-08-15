const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { signup, login } = require('../controllers/user.controller');
const { dataValidator } = require('../middlewares/dataValidator');

router.post('/signup',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    body('password').isAlphanumeric().withMessage('Password must contain letters and numbers'),
    body('name').not().isEmpty().withMessage('Name is required'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),
    body('phone').isNumeric().withMessage('Phone number must be numeric'),
    dataValidator, signup);

router.post('/login', login);

module.exports = router;
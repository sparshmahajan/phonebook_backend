const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { addPhoneNumber, addMultiplePhoneNumbers, getAllPhoneNumbers, getPhoneNumber, getPhoneByPhaseMatching, updatePhoneNumber, deletePhoneNumber } = require('../controllers/phonebook.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { dataValidator } = require('../middlewares/dataValidator');

router.post('/', authMiddleware,
    body('name').not().isEmpty().withMessage('Name is required'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),
    body('phone').isNumeric().withMessage('Phone number must be numeric'),
    dataValidator, addPhoneNumber);

router.post('/multiple', authMiddleware,
    body('phonebook').isArray({ min: 1 }).withMessage('Phonebook must be an array of at least 1 phone number'),
    body('phonebook.*.name').not().isEmpty().withMessage('Name is required'),
    body('phonebook.*.phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),
    body('phonebook.*.phone').isNumeric().withMessage('Phone number must be numeric'),
    dataValidator, addMultiplePhoneNumbers);

router.get('/', authMiddleware, getAllPhoneNumbers);
router.get('/:id', authMiddleware, getPhoneNumber);
router.get('/search/:phone', getPhoneByPhaseMatching);
router.put('/:id', authMiddleware,
    body('name').not().isEmpty().withMessage('Name is required'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits long'),
    body('phone').isNumeric().withMessage('Phone number must be numeric'),
    dataValidator, updatePhoneNumber);
router.delete('/:id', authMiddleware, deletePhoneNumber);

module.exports = router;
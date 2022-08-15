const phonebookSchema = require('../models/phonebookSchema');

const addPhoneNumber = async (req, res) => {
    const { name, phone } = req.body;
    const newPhonebook = new phonebookSchema({
        name: name,
        phone: phone
    });
    try {
        const result = await newPhonebook.save();
        res.status(201).json({
            message: 'Phone number added successfully',
            phonebookId: result._id,
            name: result.name,
            phone: result.phone
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const addMultiplePhoneNumbers = async (req, res) => {
    const { phonebook } = req.body;
    try {
        const result = await phonebookSchema.insertMany(phonebook);
        res.status(201).json({
            message: 'Phone numbers added successfully',
            phonebook: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

const getAllPhoneNumbers = async (req, res) => {
    const { page, limit } = req.query;
    if (!page || !limit) {
        res.status(400).send({ message: 'Page and limit are required' });
    }
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    try {
        const result = await phonebookSchema.find().skip(skip).limit(limitNumber);
        res.status(200).json({
            message: 'Phone numbers retrieved successfully',
            phonebook: result
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getPhoneNumber = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await phonebookSchema.findById(id);
        res.status(200).json({
            message: 'Phone number retrieved successfully',
            phonebook: result
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const updatePhoneNumber = async (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;
    try {
        const result = await phonebookSchema.findByIdAndUpdate(id, {
            name: name,
            phone: phone
        }, { new: true });
        res.status(200).json({
            message: 'Phone number updated successfully',
            phonebook: result
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deletePhoneNumber = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await phonebookSchema.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Phone number deleted successfully',
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getPhoneByPhaseMatching = async (req, res) => {
    const { phone } = req.params;
    const containsNumber = /^[0-9]*$/.test(phone);
    if (!containsNumber) {
        const result = await phonebookSchema.find({ name: { $regex: phone, $options: 'i' } });
        res.status(200).json({
            message: 'Phone number retrieved successfully',
            phonebook: result
        });
    } else {
        const result = await phonebookSchema.find({ phone: { $regex: phone, $options: 'i' } });
        res.status(200).json({
            message: 'Phone number retrieved successfully',
            phonebook: result
        });
    }
}

module.exports = { addPhoneNumber, addMultiplePhoneNumbers, getAllPhoneNumbers, getPhoneNumber, updatePhoneNumber, deletePhoneNumber, getPhoneByPhaseMatching };
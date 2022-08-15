const mongoose = require('mongoose');

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
});

const phonebook = mongoose.model('Phonebook', phonebookSchema);

module.exports = phonebook;
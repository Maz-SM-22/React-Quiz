const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Not a valid email format.']
    },
    hash: {
        type: String,
        required: [true]
    },
    results: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
        default: []
    }]
})

module.exports = new mongoose.model('User', userSchema); 
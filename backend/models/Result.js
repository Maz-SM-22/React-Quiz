const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true]
    },
    answers: {
        type: [{
            question: String,
            answer: String,
            correctAnswer: String,
            isCorrect: Boolean
        }],
        required: [true],
    }
})

module.exports = new mongoose.model('Result', resultsSchema); 
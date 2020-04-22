const mongoose = require('mongoose')

const Answer = require('./answer.js')
const answerSchema = Answer.schema

// const answerSchema = require('./answer.js')

const surveySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option2: {
    type: String,
    required: true
  },
  option3: {
    type: String,
    required: false
  },
  option4: {
    type: String,
    required: false
  },
  option5: {
    type: String,
    required: false
  },
  answers: [answerSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Survey', surveySchema)

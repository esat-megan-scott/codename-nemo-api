const express = require('express')
const passport = require('passport')
const Answer = require('../models/answer')
const Survey = require('../models/survey')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /answer
router.get('/answers', requireToken, (req, res, next) => {
  Answer.find()
    .then(answers => {
      return answers.map(answer => answer.toObject())
    })
    .then(answers => res.status(200).json({ answers: answers }))
    .catch(next)
})

// CREATE
// POST /answers
router.post('/answers', requireToken, (req, res, next) => {
  req.body.answer.owner = req.user.id
  let answerId = null

  Answer.create(req.body.answer)
    .then(answer => {
      // set responseId for later use
      answerId = answer.id
      // return the Survey thats being responded to
      return Survey.findById(req.body.answer.question)
    })
    .then(survey => {
      // push the current response to the survey
      return survey.update({$push: {answer: answerId}})
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router

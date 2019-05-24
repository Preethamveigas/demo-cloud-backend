const Validator = require('validator')
const isEmpty = require('./is-empty')
module.exports = function validatePostInput(data) {
  data.text = !isEmpty(data.text) ? data.text : ''
  data.name = !isEmpty(data.name) ? data.name : ''
  data.avatar = !isEmpty(data.avatar) ? data.avatar : ''
  let errors = {}


  if (Validator.isEmpty(data.name)) {
    errors.name = "Name should not be empty";
  }

  if (Validator.isEmpty(data.text)) {
    errors.post = "Post should not be empty";
  }

  if (Validator.isEmpty(data.avatar)) {
    errors.avatar = "Avatar is missing!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
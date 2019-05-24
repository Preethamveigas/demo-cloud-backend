const Validator = require('validator')
const isEmpty = require('./is-empty')
module.exports = function validateRegistrationInput(data) {
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  let errors = {}

  if (!Validator.isLength(data.name, {
      min: 5,
      max: 30
    })) {
    errors.name = "Name must be between 2 to 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name should not be empty";
  }
  if (!Validator.isEmail(data.email)) {
    console.log(data)
    errors.email = "Email is invalid"
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email should not be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
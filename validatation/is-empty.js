const isEmpty = valid =>
  valid === null || valid === undefined ||
  (typeof valid === 'object' && Object.keys(valid).length === 0) ||
  (typeof valid === 'string' && valid.trim().length === 0)



module.exports = isEmpty
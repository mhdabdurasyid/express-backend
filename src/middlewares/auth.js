require('dotenv').config()
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/responses')

module.exports = (request, response, next) => {
  const { authorization } = request.headers

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.slice(7, authorization.length)

    try {
      const payload = jwt.verify(token, process.env.APP_KEY)

      if (payload) {
        request.user = payload
        next()
      } else {
        return responseStandard(response, 'Unauthorized', {}, 401, false)
      }
    } catch (error) {
      return responseStandard(response, error.message, {}, 500, false)
    }
  } else {
    return responseStandard(response, 'Forbidden access', {}, 403, false)
  }
}

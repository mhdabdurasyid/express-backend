require('dotenv').config()
const jwt = require('jsonwebtoken')
const { sellerLogin } = require('../models/sellers')
const { customerLogin } = require('../models/costumers')
const responseStandard = require('../helpers/responses')
const bcrypt = require('bcryptjs')

module.exports = {
  sellerLoginController: (request, response) => {
    const { email, password } = request.body

    sellerLogin(email, (error, result) => {
      if (!error) {
        if (result.length) {
          let data = false
          data = bcrypt.compareSync(password, result[0].password)

          if (data) {
            jwt.sign({ id: data.id }, process.env.APP_KEY, (_error, token) => {
              return responseStandard(response, 'Login success', { token })
            })
          } else {
            return responseStandard(response, 'Wrong email or password', {}, 200, false)
          }
        } else {
          return responseStandard(response, 'Wrong email', {}, 200, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  },
  customerLoginController: (request, response) => {
    const { email, password } = request.body

    customerLogin(email, (error, result) => {
      if (!error) {
        if (result.length) {
          let data = false
          data = bcrypt.compareSync(password, result[0].password)

          if (data) {
            jwt.sign({ id: data.id }, process.env.APP_KEY, (_error, token) => {
              return responseStandard(response, 'Login success', { token })
            })
          } else {
            return responseStandard(response, 'Wrong password', {}, 200, false)
          }
        } else {
          return responseStandard(response, 'Wrong email', {}, 200, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  }
}

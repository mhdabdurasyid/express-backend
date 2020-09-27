require('dotenv').config()
const jwt = require('jsonwebtoken')
const { sellerLogin } = require('../models/sellers')
const responseStandard = require('../helpers/responses')
const bcrypt = require('bcryptjs')

module.exports = {
  sellerLoginController: (request, response) => {
    const { email, password } = request.body

    sellerLogin(email, (_error, result) => {
      let data = false
      data = bcrypt.compareSync(password, result[0].password)

      if (data) {
        jwt.sign({ id: data.id }, process.env.APP_KEY, (_error, token) => {
          return responseStandard(response, 'Login success', { token })
        })
      } else {
        return responseStandard(response, 'Wrong email or password', {}, 200, false)
      }
    })
  }
}

// const qs = require('querystring')
const { addSellerModel } = require('../models/sellers')

module.exports = {
  addSeller: (request, response) => {
    const { email, password, storeName, phone, storeDescription } = request.body

    if (email && password && storeName && phone && storeDescription) {
      addSellerModel(request.body, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add seller',
            data: {
              id: result.insertId,
              ...request.body
            }
          })
        } else {
          response.status(500).send({
            success: false,
            message: error.message
          })
        }
      })
    } else {
      response.status(400).send({
        success: false,
        message: 'Incomplete data on key & value'
      })
    }
  }
}

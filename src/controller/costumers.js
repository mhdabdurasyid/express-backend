const { addCostumerModel, getDetailCostumerModel } = require('../models/costumers')

module.exports = {
  addCostumer: (request, response) => {
    const { email, password, name, phone, birthday, genderID } = request.body

    if (email && password && name && phone && birthday && genderID) {
      addCostumerModel(request.body, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add costumer',
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
  },
  getDetailCostumer: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getDetailCostumerModel(id, (error, result) => {
        if (!error) {
          if (result.length) {
            response.send({
              success: true,
              message: 'Found a customer',
              data: result
            })
          } else {
            response.send({
              success: false,
              message: 'No data found'
            })
          }
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
        message: 'Invalid or bad ID'
      })
    }
  }
}

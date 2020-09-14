const { addCostumerModel } = require('../models/costumers')

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
  }
}

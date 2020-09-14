const { addCostumerModel, getDetailCostumerModel, updateCostumerPartialModel } = require('../models/costumers')

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
  },
  updateCostumerPartial: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { email = '', password = '', name = '', phone = '', birthday = '', genderID = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (email.trim() || password.trim() || name.trim() || phone.trim() || birthday.trim() || genderID.trim()) {
        const patchData = Object.entries(request.body).map(el => `${el[0]} = '${el[1].replace(/'/gi, "''")}'`).join(', ')

        updateCostumerPartialModel(id, patchData, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              response.send({
                success: true,
                message: `Success update costumer with ID ${id}!`
              })
            } else {
              response.status(400).send({
                success: false,
                message: `Update failed! ID ${id} not found`
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
          message: 'Update failed! Incomplete key & value'
        })
      }
    } else {
      response.status(400).send({
        success: false,
        message: 'Invalid or bad ID'
      })
    }
  }
}

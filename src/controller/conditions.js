// const qs = require('querystring')
const { addConditionModel, getConditionsModel } = require('../models/conditions')

module.exports = {
  addCondition: (request, response) => {
    const { name } = request.body

    if (name) {
      addConditionModel(name, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add condition',
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
  getConditions: (request, response) => {
    getConditionsModel((error, result) => {
      if (!error) {
        if (result.length) {
          response.send({
            success: true,
            message: 'List of conditions',
            data: result
          })
        } else {
          response.status(400).send({
            success: false,
            message: 'No data on conditions'
          })
        }
      } else {
        response.status(500).send({
          success: false,
          message: error.message
        })
      }
    })
  }
}

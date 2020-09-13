// const qs = require('querystring')
const { addColorModel, getColorsModel } = require('../models/colors')

module.exports = {
  addColor: (request, response) => {
    const { name } = request.body

    if (name) {
      addColorModel(name, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add color',
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
  getColors: (request, response) => {
    getColorsModel((error, result) => {
      if (!error) {
        if (result.length) {
          response.send({
            success: true,
            message: 'List of colors',
            data: result
          })
        } else {
          response.status(400).send({
            success: false,
            message: 'No data on colors'
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

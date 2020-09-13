// const qs = require('querystring')
const { addColorModel, getColorsModel, updateColorModel } = require('../models/colors')

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
  },
  updateColor: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim()) {
        updateColorModel(id, name, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              response.send({
                success: true,
                message: `Success update color with ID ${id}!`
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

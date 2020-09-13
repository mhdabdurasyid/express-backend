// const qs = require('querystring')
const { addConditionModel, getConditionsModel, updateConditionModel, deleteConditionModel } = require('../models/conditions')

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
  },
  updateCondition: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { name = '' } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (name.trim()) {
        updateConditionModel(id, name, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              response.send({
                success: true,
                message: `Success update condition with ID ${id}!`
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
  },
  deleteCondition: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteConditionModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            response.send({
              success: true,
              message: `Success delete condition with ID ${id}!`
            })
          } else {
            response.status(400).send({
              success: false,
              message: `Delete failed! ID ${id} not found`
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

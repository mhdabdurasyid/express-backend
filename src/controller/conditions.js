const { addConditionModel, getConditionsModel, updateConditionModel, deleteConditionModel } = require('../models/conditions')
const responseStandard = require('../helpers/responses')

module.exports = {
  addCondition: (request, response) => {
    const { name } = request.body

    if (name) {
      addConditionModel(name, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add new condition', {
            data: {
              id: result.insertId,
              ...request.body
            }
          })
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'All field must be fill', {}, 400, false)
    }
  },
  getConditions: (request, response) => {
    getConditionsModel((error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'List of conditions', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 400, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
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
              return responseStandard(response, `Success update condition with ID ${id}!`, {})
            } else {
              return responseStandard(response, `Update failed! ID ${id} not found`, {}, 400, false)
            }
          } else {
            return responseStandard(response, error.message, {}, 500, false)
          }
        })
      } else {
        return responseStandard(response, 'All field must be fill', {}, 400, false)
      }
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  deleteCondition: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteConditionModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, `Success delete condition with ID ${id}!`, {})
          } else {
            return responseStandard(response, `Delete failed! ID ${id} not found`, {}, 400, false)
          }
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  }
}

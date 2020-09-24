const { addColorModel, getColorsModel, updateColorModel, deleteColorModel } = require('../models/colors')
const responseStandard = require('../helpers/responses')

module.exports = {
  addColor: (request, response) => {
    const { name } = request.body

    if (name) {
      addColorModel(name, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add new color', {
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
  getColors: (request, response) => {
    getColorsModel((error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'List of color', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 400, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
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
              return responseStandard(response, `Success update color with ID ${id}!`, {})
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
  deleteColor: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteColorModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, `Success delete color with ID ${id}!`, {})
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

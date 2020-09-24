const { addCostumerModel, getDetailCostumerModel, updateCostumerPartialModel, deleteCostumerModel } = require('../models/costumers')
const responseStandard = require('../helpers/responses')

module.exports = {
  addCostumer: (request, response) => {
    const { email, password, name, phone, birthday, genderID } = request.body

    if (email && password && name && phone && birthday && genderID) {
      addCostumerModel(request.body, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add new costumer', {
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
  getDetailCostumer: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getDetailCostumerModel(id, (error, result) => {
        if (!error) {
          if (result.length) {
            return responseStandard(response, 'Found a customer', { data: result })
          } else {
            return responseStandard(response, 'No data found', {}, 200, false)
          }
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
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
              return responseStandard(response, `Success update costumer with ID ${id}!`, {})
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
  deleteCostumer: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteCostumerModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, `Success delete costumer with ID ${id}!`, {})
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

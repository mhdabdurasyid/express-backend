const { addCostumerModel, getDetailCostumerModel, updateCostumerPartialModel, deleteCostumerModel } = require('../models/costumers')
const responseStandard = require('../helpers/responses')
const bcrypt = require('bcryptjs')
const upload = require('../helpers/upload')
const fs = require('fs')

module.exports = {
  addCostumer: (request, response) => {
    const { email, password, name } = request.body

    if (email && password && name) {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)
      const data = {
        ...request.body,
        password: hashedPassword
      }

      addCostumerModel(data, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add new costumer', {
            data: {
              id: result.insertId,
              ...data
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
    const uploadImage = upload.single('image')
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      getDetailCostumerModel(id, (err, res) => {
        if (!err) {
          if (res.length) {
            uploadImage(request, response, (error) => {
              if (error) {
                return responseStandard(response, error.message, {}, 400, false)
              } else {
                const image = request.file
                const { email = '', password = '', name = '', phone = '', birthday = '', gender_id = '' } = request.body

                if (email.trim() || password.trim() || name.trim() || phone.trim() || birthday.trim() || gender_id.trim() || image) {
                  const patchData = Object.entries(request.body).map(el => {
                    if (el[0] === 'password') {
                      const salt = bcrypt.genSaltSync(10)
                      const hashedPassword = bcrypt.hashSync(password, salt)
                      return `${el[0]} = '${hashedPassword}'`
                    }
                    return `${el[0]} = '${el[1].replace(/'/gi, "''")}'`
                  })

                  if (image) {
                    patchData.push(`photo_profile = '/uploads/${image.filename}'`)
                  }

                  updateCostumerPartialModel(id, patchData, (error, result) => {
                    if (!error) {
                      if (result.affectedRows) {
                        if (res[0].photo_profile !== '') {
                          fs.unlinkSync(`assets/${res[0].photo_profile}`)
                        }
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
              }
            })
          } else {
            return responseStandard(response, 'No data found', {}, 200, false)
          }
        } else {
          return responseStandard(response, err.message, {}, 500, false)
        }
      })
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

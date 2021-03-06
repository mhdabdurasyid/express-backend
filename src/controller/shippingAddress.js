const { addShippingAddressModel, getDetailShippingAddressModel, updateShippingAddressModel, deleteShippingAddressModel, getDetailShippingAddressByID, getPrimaryAddress } = require('../models/shippingAddress')
const responseStandard = require('../helpers/responses')

module.exports = {
  addShippingAddress: (request, response) => {
    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress } = request.body

    if (addressName && address && recipientName && recipientPhone && city && postalCode && primaryAddress) {
      const data = {
        ...request.body,
        costumerID: request.user.id
      }

      addShippingAddressModel(data, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add new costumer shipping address', {
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
  getDetailShippingAddress: (request, response) => {
    const { id } = request.user

    getDetailShippingAddressModel(id, (error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'Found customer shipping addresses', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 200, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  },
  updateShippingAddress: (request, response) => {
    let { id } = request.params
    id = Number(id)

    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress } = request.body

    if (typeof id === 'number' && !isNaN(id)) {
      if (addressName && address && recipientName && recipientPhone && city && postalCode && primaryAddress) {
        updateShippingAddressModel(id, request.body, (error, result) => {
          if (!error) {
            if (result.affectedRows) {
              return responseStandard(response, `Success update shipping address with ID ${id}!`, {})
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
  deleteShippingAddress: (request, response) => {
    let { id } = request.params
    id = Number(id)

    if (typeof id === 'number' && !isNaN(id)) {
      deleteShippingAddressModel(id, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, 'Delete shipping address success', {})
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
  },
  getShippingAddressByID: (request, response) => {
    const { id } = request.user
    let { shippingAddressID } = request.params
    shippingAddressID = Number(shippingAddressID)

    getDetailShippingAddressByID(id, shippingAddressID, (error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'Found customer shipping addresses', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 200, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  },
  getPrimaryAddress: (request, response) => {
    const { id } = request.user

    getPrimaryAddress(id, (error, result) => {
      if (!error) {
        if (result.length) {
          return responseStandard(response, 'Found customer primary shipping addresses', { data: result })
        } else {
          return responseStandard(response, 'No data found', {}, 200, false)
        }
      } else {
        return responseStandard(response, error.message, {}, 500, false)
      }
    })
  }
}

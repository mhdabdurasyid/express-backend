const { addShippingAddressModel } = require('../models/shippingAddress')
const responseStandard = require('../helpers/responses')

module.exports = {
  addShippingAddress: (request, response) => {
    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress, costumerID } = request.body

    if (addressName && address && recipientName && recipientPhone && city && postalCode && primaryAddress && costumerID) {
      addShippingAddressModel(request.body, (error, result) => {
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
  }
}

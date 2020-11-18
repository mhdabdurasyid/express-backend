const { postOrderModel, postOrderDetailModel } = require('../models/orders')
const responseStandard = require('../helpers/responses')

module.exports = {
  postOrder: (request, response) => {
    const { totalPrice, shippingAddress, orderStatus } = request.body

    if (totalPrice && shippingAddress && orderStatus) {
      const data = {
        ...request.body,
        costumerId: request.user.id
      }

      postOrderModel(data, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success create new order', { data: result })
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'All field must be fill', {}, 400, false)
    }
  },
  postOrderDetail: (request, response) => {
    const { orderId, name, quantity, totalPrice, itemId, sellerId } = request.body

    if (orderId && name && quantity && totalPrice && itemId && sellerId) {
      postOrderDetailModel(request.body, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success create order detail', { data: request.body })
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'All field must be fill', {}, 400, false)
    }
  }
}

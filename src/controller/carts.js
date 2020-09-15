const { addCartModel, getDetailCartModel } = require('../models/carts')

module.exports = {
  addCart: (request, response) => {
    const { costumerID, itemID, quantity } = request.body

    if (costumerID && itemID && quantity) {
      addCartModel(request.body, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add item to cart',
            data: request.body
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
  getDetailCart: (request, response) => {
    let { costumerID } = request.params
    costumerID = Number(costumerID)

    if (typeof costumerID === 'number' && !isNaN(costumerID)) {
      getDetailCartModel(costumerID, (error, result) => {
        if (!error) {
          if (result.length) {
            let summary = 0
            Object.values(result).forEach(el => {
              summary += el.price * el.quantity
            })

            response.send({
              success: true,
              message: 'Found a customer cart',
              data: result,
              summary: summary
            })
          } else {
            response.send({
              success: false,
              message: 'No data found'
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
        message: 'Invalid or bad costumer ID'
      })
    }
  }
}

const { addCartModel, getDetailCartModel, updateCartPartialModel } = require('../models/carts')

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
  },
  updateCartPartial: (request, response) => {
    let { costumerID, itemID } = request.params
    costumerID = Number(costumerID)
    itemID = Number(itemID)

    const { quantity = '' } = request.body

    if (typeof costumerID === 'number' && !isNaN(costumerID) && typeof itemID === 'number' && !isNaN(itemID)) {
      if (quantity.trim()) {
        if (Number.isNaN(quantity) || Math.sign(quantity) === -1 || Math.sign(quantity) === 0) {
          response.status(400).send({
            success: false,
            message: 'Update failed! Quantity must be a positive number'
          })
        } else {
          updateCartPartialModel(costumerID, itemID, quantity, (error, result) => {
            if (!error) {
              if (result.affectedRows) {
                response.send({
                  success: true,
                  message: `Success update quantity with item ID ${itemID} and customer ID ${costumerID}!`
                })
              } else {
                response.status(400).send({
                  success: false,
                  message: 'Update failed! Item not found on cart'
                })
              }
            } else {
              response.status(500).send({
                success: false,
                message: error.message
              })
            }
          })
        }
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

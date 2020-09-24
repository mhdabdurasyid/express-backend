const { addCartModel, getDetailCartModel, updateCartPartialModel, deleteCartModel } = require('../models/carts')
const responseStandard = require('../helpers/responses')

module.exports = {
  addCart: (request, response) => {
    const { costumerID, itemID, quantity } = request.body

    if (costumerID && itemID && quantity) {
      addCartModel(request.body, (error, result) => {
        if (!error) {
          return responseStandard(response, 'Success add item to cart', { data: request.body })
        } else {
          return responseStandard(response, error.message, {}, 500, false)
        }
      })
    } else {
      return responseStandard(response, 'All field must be fill', {}, 400, false)
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

            return responseStandard(response, 'Found a customer cart', {
              data: result,
              summary: summary
            })
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
  updateCartPartial: (request, response) => {
    let { costumerID, itemID } = request.params
    costumerID = Number(costumerID)
    itemID = Number(itemID)

    const { quantity = '' } = request.body

    if (typeof costumerID === 'number' && !isNaN(costumerID) && typeof itemID === 'number' && !isNaN(itemID)) {
      if (quantity.trim()) {
        if (Number.isNaN(quantity) || Math.sign(quantity) === -1 || Math.sign(quantity) === 0) {
          return responseStandard(response, 'Update failed! Quantity must be a positive number', {}, 400, false)
        } else {
          updateCartPartialModel(costumerID, itemID, quantity, (error, result) => {
            if (!error) {
              if (result.affectedRows) {
                return responseStandard(response, `Success update quantity of item ID ${itemID} from customer ID ${costumerID}!`, {})
              } else {
                return responseStandard(response, 'Update failed! Item not found on cart', {}, 400, false)
              }
            } else {
              return responseStandard(response, error.message, {}, 500, false)
            }
          })
        }
      } else {
        return responseStandard(response, 'All field must be fill', {}, 400, false)
      }
    } else {
      return responseStandard(response, 'Invalid or bad ID', {}, 400, false)
    }
  },
  deleteCart: (request, response) => {
    let { costumerID, itemID } = request.params
    costumerID = Number(costumerID)
    itemID = Number(itemID)

    if (typeof costumerID === 'number' && !isNaN(costumerID) && typeof itemID === 'number' && !isNaN(itemID)) {
      deleteCartModel(costumerID, itemID, (error, result) => {
        if (!error) {
          if (result.affectedRows) {
            return responseStandard(response, `Success delete item ID ${itemID} from customer ID ${costumerID}!`, {})
          } else {
            return responseStandard(response, 'Delete failed! Item not found on cart', {}, 400, false)
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

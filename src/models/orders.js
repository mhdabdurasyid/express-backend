const db = require('../helpers/db')
const table = 'orders'

module.exports = {
  postOrderModel: (data, cb) => {
    const { totalPrice, shippingAddress, costumerId, orderStatus } = data

    db.query(`insert into ${table} (total_price, shipping_address, costumer_id, order_status)
    values (${totalPrice}, '${shippingAddress}', ${costumerId}, ${orderStatus})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  postOrderDetailModel: (data, cb) => {
    const { orderId, name, quantity, totalPrice, itemId, sellerId } = data

    db.query(`insert into order_details (order_id, name, quantity, total_price, item_id, seller_id)
    values (${orderId}, '${name}', ${quantity}, ${totalPrice}, ${itemId}, ${sellerId})`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

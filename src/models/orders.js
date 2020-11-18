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
  },
  getOrderModel: (costumerId, cb) => {
    db.query(`SELECT ${table}.id, created_at, total_price, shipping_address, name as status, 
    (SELECT count(id) FROM order_details where order_id=${table}.id) as quantity 
    FROM ${table} JOIN order_status ON order_status=order_status.id
    where costumer_id=${costumerId}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getOrderDetailModel: (id, cb) => {
    db.query(`SELECT order_details.id, order_details.name, quantity, order_details.total_price, store_name,
    (SELECT url from item_images where item_images.item_id=order_details.item_id LIMIT 1) as img_thumbnail,
    ${table}.id as order_id, created_at, shipping_address, ${table}.total_price, order_status.name as status
    FROM order_details JOIN sellers ON seller_id=sellers.id
    JOIN ${table} ON ${table}.id=order_id
    JOIN order_status ON order_status=order_status.id
    WHERE order_id=${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

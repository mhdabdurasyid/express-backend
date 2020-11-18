const db = require('../helpers/db')
const table = 'carts'

module.exports = {
  addCartModel: (data, cb) => {
    const { costumerID, itemID, quantity } = data

    db.query(`insert into ${table} (costumer_id, item_id, quantity) values (${costumerID}, ${itemID}, ${quantity})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailCartModel: (costumerID, cb) => {
    db.query(`select item_id, items.name, store_name, sellers.id as seller_id, price, quantity, city_id,
    (select url from item_images where item_id = items.id limit 1) as img_thumbnail
    from ${table} join costumers on ${table}.costumer_id = costumers.id 
    join items on ${table}.item_id = items.id 
    join sellers on seller_id = sellers.id
    where ${table}.costumer_id = ${costumerID}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateCartPartialModel: (costumerID, itemID, quantity, cb) => {
    db.query(`update ${table} set quantity = ${quantity} where costumer_id = ${costumerID} and item_id = ${itemID}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteCartModel: (costumerID, itemID, cb) => {
    db.query(`delete from ${table} where costumer_id = ${costumerID} and item_id = ${itemID}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

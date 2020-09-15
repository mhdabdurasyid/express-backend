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
    db.query(`select items.name, categories.name as category, price, quantity 
    from ${table} join costumers on ${table}.costumer_id = costumers.id 
    join items on ${table}.item_id = items.id 
    join categories on items.category_id = categories.id
    where ${table}.costumer_id = ${costumerID}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateCartPartialModel: (costumerID, itemID, quantity, cb) => {
    db.query(`update ${table} set quantity = ${quantity} where costumer_id = ${costumerID} and item_id = ${itemID}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

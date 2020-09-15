const db = require('../helpers/db')
const table = 'carts'

module.exports = {
  addCartModel: (data, cb) => {
    const { costumerID, itemID, quantity } = data

    db.query(`insert into ${table} (costumer_id, item_id, quantity) values (${costumerID}, ${itemID}, ${quantity})`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

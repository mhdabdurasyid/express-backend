const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getDetailItemModel: (id, cb) => {
    db.query(`select * from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  addItemModel: (data, cb) => {
    const { name, price, description, stock, categoryID, conditionID, colorID, sellerID } = data

    db.query(`insert into ${table} (name, price, description, stock, category_id, condition_id, color_id, seller_id) values ('${name.replace(/'/gi, "''")}', ${price}, '${description.replace(/'/gi, "''")}', ${stock}, ${categoryID}, ${conditionID}, ${colorID}, ${sellerID})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateItemModel: (id, data, cb) => {
    const { name, price, description } = data

    db.query(`update ${table} set name = '${name.replace(/'/gi, "''")}', price = ${price}, description = '${description.replace(/'/gi, "''")}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updatePartiallyItemModel: (id, data, cb) => {
    db.query(`update ${table} set ${data} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getItemsModel: (searchKey, searchValue, page, limit, sortColumn, sortOption, cb) => {
    db.query(`select * from ${table} where ${searchKey} like '%${searchValue.replace(/'/gi, "''")}%' order by ${sortColumn} ${sortOption} limit ${limit} offset ${(page - 1) * limit}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  countItemsModel: (searchKey, searchValue, cb) => {
    db.query(`select count(*) as count from ${table} where ${searchKey} like '%${searchValue.replace(/'/gi, "''")}%'`, (_error, result, fields) => {
      cb(result)
    })
  }
}

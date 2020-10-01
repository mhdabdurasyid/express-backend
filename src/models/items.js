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
    const { name, price, description, stock, categoryID, conditionID, colorID } = data

    db.query(`update ${table} set name = '${name.replace(/'/gi, "''")}', price = ${price}, description = '${description.replace(/'/gi, "''")}', stock = ${stock}, category_id = ${categoryID}, condition_id = ${conditionID}, color_id = ${colorID} where id = ${id}`, (error, result, fields) => {
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
    db.query(`select items.id, items.name, price, description, stock, created_at, modified_at, categories.name as category, conditions.name as conditions, colors.name as color, store_name,
    (select url from item_images where item_id = ${table}.id limit 1) as img_thumbnail
    from ${table} join categories on items.category_id = categories.id 
    join conditions on items.condition_id = conditions.id 
    join colors on items.color_id = colors.id 
    join sellers on items.seller_id = sellers.id 
    where ${searchKey} like '%${searchValue.replace(/'/gi, "''")}%' 
    order by ${sortColumn} ${sortOption} limit ${limit} offset ${(page - 1) * limit}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  countItemsModel: (searchKey, searchValue, cb) => {
    db.query(`select count(*) as count from ${table} where ${searchKey} like '%${searchValue.replace(/'/gi, "''")}%'`, (_error, result, fields) => {
      cb(result)
    })
  },
  getItemsByColumn: (searchKey, searchValue, page, limit, sortColumn, sortOption, columnID, categoryID, cb) => {
    db.query(`select * from ${table} where ${columnID} = ${categoryID}
    and ${searchKey} like '%${searchValue.replace(/'/gi, "''")}%' 
    order by ${sortColumn} ${sortOption} limit ${limit} offset ${(page - 1) * limit}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  countItemsByColumn: (searchKey, searchValue, columnID, categoryID, cb) => {
    db.query(`select count(*) as count from ${table} where ${columnID} = ${categoryID} and ${searchKey} like '%${searchValue.replace(/'/gi, "''")}%'`, (_error, result, fields) => {
      cb(result)
    })
  }
}

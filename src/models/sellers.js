const db = require('../helpers/db')
const table = 'sellers'

module.exports = {
  addSellerModel: (data, cb) => {
    const { email, password, storeName, phone } = data

    db.query(`insert into ${table} (email, password, store_name, phone) values ('${email.replace(/'/gi, "''")}', '${password}', '${storeName.replace(/'/gi, "''")}', '${phone}')`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getSellersModel: (page, limit, search, sort, cb) => {
    db.query(`select id, store_name, phone, store_description, store_photo from ${table} where store_name like '%${search.replace(/'/gi, "''")}%' order by store_name ${sort} limit ${limit} offset ${(page - 1) * limit}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  countSellersModel: (search, cb) => {
    db.query(`select count(*) as count from ${table} where store_name like '%${search.replace(/'/gi, "''")}%'`, (_error, result, fields) => {
      cb(result)
    })
  },
  updateSellerModel: (id, data, cb) => {
    const { email, storeName, phone, storeDescription } = data

    db.query(`update ${table} set email = '${email.replace(/'/gi, "''")}', store_name = '${storeName.replace(/'/gi, "''")}', phone = '${phone.replace(/'/gi, "''")}', store_description = '${storeDescription.replace(/'/gi, "''")}' where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateSellerPartialModel: (id, data, cb) => {
    db.query(`update ${table} set ${data} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteSellerModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailSellerModel: (id, cb) => {
    db.query(`select * from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  sellerLogin: (email, cb) => {
    db.query(`select id, email, password from ${table} where email = '${email}'`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

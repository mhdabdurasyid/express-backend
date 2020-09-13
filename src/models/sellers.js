const db = require('../helpers/db')
const table = 'sellers'

module.exports = {
  addSellerModel: (data, cb) => {
    const { email, password, storeName, phone, storeDescription } = data

    db.query(`insert into ${table} (email, password, store_name, phone, store_description) values ('${email.replace(/'/gi, "''")}', '${password.replace(/'/gi, "''")}', '${storeName.replace(/'/gi, "''")}', '${phone.replace(/'/gi, "''")}', '${storeDescription.replace(/'/gi, "''")}')`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

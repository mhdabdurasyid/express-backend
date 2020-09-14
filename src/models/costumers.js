const db = require('../helpers/db')
const table = 'costumers'

module.exports = {
  addCostumerModel: (data, cb) => {
    const { email, password, name, phone, birthday, genderID } = data

    db.query(`insert into ${table} (email, password, name, phone, birthday, gender_id) values ('${email.replace(/'/gi, "''")}', '${password.replace(/'/gi, "''")}', '${name.replace(/'/gi, "''")}', '${phone.replace(/'/gi, "''")}', '${birthday}', ${genderID})`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

const db = require('../helpers/db')
const table = 'costumers'

module.exports = {
  addCostumerModel: (data, cb) => {
    const { email, password, name, phone, birthday, genderID } = data

    db.query(`insert into ${table} (email, password, name, phone, birthday, gender_id) values ('${email.replace(/'/gi, "''")}', '${password.replace(/'/gi, "''")}', '${name.replace(/'/gi, "''")}', '${phone.replace(/'/gi, "''")}', '${birthday}', ${genderID})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailCostumerModel: (id, cb) => {
    db.query(`select ${table}.id, email, password, ${table}.name, phone, birthday, genders.name as gender
    from ${table} join genders on gender_id = genders.id where ${table}.id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateCostumerPartialModel: (id, data, cb) => {
    db.query(`update ${table} set ${data} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteCostumerModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

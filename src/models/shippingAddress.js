const db = require('../helpers/db')
const table = 'shipping_addresses'

module.exports = {
  addShippingAddressModel: (data, cb) => {
    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress, costumerID } = data

    db.query(`insert into ${table} (address_name, address, recipient_name, recipient_phone, city, postal_code, primary_address, costumer_id) 
    values ('${addressName.replace(/'/gi, "''")}', '${address.replace(/'/gi, "''")}', '${recipientName.replace(/'/gi, "''")}', '${recipientPhone}',
    '${city.replace(/'/gi, "''")}', '${postalCode}', ${primaryAddress}, ${costumerID})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailShippingAddressModel: (id, cb) => {
    db.query(`select recipient_name, recipient_phone, address_name, concat(address, ", ", city, ", ", postal_code) as full_address, primary_address
    from ${table} where costumer_id = '${id}'`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateShippingAddressModel: (id, data, cb) => {
    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress } = data

    db.query(`update ${table} set address_name = '${addressName.replace(/'/gi, "''")}', address = '${address.replace(/'/gi, "''")}',
    recipient_name = '${recipientName.replace(/'/gi, "''")}', recipient_phone = '${recipientPhone}', city = '${city.replace(/'/gi, "''")}',
    postal_code = '${postalCode}', primary_address = ${primaryAddress} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

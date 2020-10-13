const db = require('../helpers/db')
const table = 'shipping_addresses'

module.exports = {
  addShippingAddressModel: (data, cb) => {
    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress, costumerID } = data

    db.query(`insert into ${table} (address_name, address, recipient_name, recipient_phone, city_id, postal_code, primary_address, costumer_id) 
    values ('${addressName.replace(/'/gi, "''")}', '${address.replace(/'/gi, "''")}', '${recipientName.replace(/'/gi, "''")}', '${recipientPhone}',
    '${city}', '${postalCode}', ${primaryAddress}, ${costumerID})`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailShippingAddressModel: (id, cb) => {
    db.query(`select ${table}.id, recipient_name, recipient_phone, address_name, concat(address, ", ", cities.name, ", ", provinces.name, ", ", postal_code) as full_address, primary_address, cities.id as city_id
    from ${table} join cities on city_id = cities.id
    join provinces on province_id = provinces.id
    where costumer_id = '${id}'`, (error, result, fields) => {
      cb(error, result)
    })
  },
  updateShippingAddressModel: (id, data, cb) => {
    const { addressName, address, recipientName, recipientPhone, city, postalCode, primaryAddress } = data

    db.query(`update ${table} set address_name = '${addressName.replace(/'/gi, "''")}', address = '${address.replace(/'/gi, "''")}',
    recipient_name = '${recipientName.replace(/'/gi, "''")}', recipient_phone = '${recipientPhone}', city_id = '${city}',
    postal_code = '${postalCode}', primary_address = ${primaryAddress} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  deleteShippingAddressModel: (id, cb) => {
    db.query(`delete from ${table} where id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getDetailShippingAddressByID: (costumerID, id, cb) => {
    db.query(`select ${table}.id, recipient_name, recipient_phone, address_name, concat(address, ", ", cities.name, ", ", provinces.name, ", ", postal_code) as full_address, primary_address, cities.id as city_id
    from ${table} join cities on city_id = cities.id
    join provinces on province_id = provinces.id
    where costumer_id = ${costumerID} and ${table}.id = ${id}`, (error, result, fields) => {
      cb(error, result)
    })
  },
  getPrimaryAddress: (id, cb) => {
    db.query(`select ${table}.id, recipient_name, recipient_phone, address_name, concat(address, ", ", cities.name, ", ", provinces.name, ", ", postal_code) as full_address, primary_address, cities.id as city_id
    from ${table} join cities on city_id = cities.id
    join provinces on province_id = provinces.id
    where costumer_id = '${id}' and primary_address = 1`, (error, result, fields) => {
      cb(error, result)
    })
  }
}

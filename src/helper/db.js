// IMPORT modul
const mysql = require('mysql');

// create connection to DB
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})

module.exports = conn;
const mysql = require('mysql2')
const config = require('../app/config')

const connection = mysql.createPool({
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT
})

connection.getConnection((err) => {
    if (err) {
        console.log("连接失败", err);
    } else {
        console.log("连接成功");
    }
})

module.exports = connection.promise()
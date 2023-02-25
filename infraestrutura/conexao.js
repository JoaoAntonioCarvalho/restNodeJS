require('dotenv').config();
const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

module.exports = conexao
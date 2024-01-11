var mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'WORDS',
  port: 3306,
});

module.exports = {
    con
}

const mysql = require("mysql2");

const config = {
  // host: 'localhost',
  host: "sql11.freemysqlhosting.net",
  // user: 'root',
  user: "sql11694909",
  // password: 'P@$sw0rd',
  password: "9TUuR7E1hr",
  // database: 'theklinkers_blog_db'
  database: "sql11694909",
};

//Create connection
const db = mysql.createPool(config);

//Connect
db.getConnection(function (err) {
  if (err) throw err;
  console.log("DB Connected");
});

module.exports = db;
// module.exports = config;

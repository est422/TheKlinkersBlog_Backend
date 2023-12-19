const mysql = require("mysql2");

const config = {
  // host: 'localhost',
  host: "sql11.freesqldatabase.com",
  // user: 'root',
  user: "sql11671527",
  // password: 'P@$sw0rd',
  password: "1lAaKu22Ji",
  // database: 'theklinkers_blog_db'
  database: "sql11671527",
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

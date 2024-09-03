const mysql = require("mysql2");

const config = {
  // host: 'localhost',
  host: "SG-blog-db-10208-mysql-master.servers.mongodirector.com",
  // user: 'root',
  // user: "sgroot",
  user: "admin",
  // password: 'P@$sw0rd',
  // password: "L24gGy8FJ5$3eYFT",
  password: "P@ssw(0)rd",
  // database: 'theklinkers_blog_db'
  database: "blog"
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

const mysql = require('mysql2');

const config = {
//    host: 'localhost',
    host: 'sql11.freemysqlhosting.net',
    // user: 'root',
    user: 'sql11647072',
    // password: 'P@$sw0rd',
    password: 'KdtTVr9JSa',
    // database: 'theklinkers_blog_db'
    database: 'sql11647072'

};

//Create connection
const db = mysql.createConnection(config);

//Connect
db.connect(function(err){
    if(err) throw err;
    console.log("DB Connected");
});   
    

module.exports = db;
// module.exports = config;

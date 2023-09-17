const mysql = require('mysql2');

const config = {
//    host: 'localhost',
    host: 'sql11.freemysqlhosting.net',
    // host: 'sql7.freemysqlhosting.net',
    // user: 'root',
    user: 'sql11647072',
    // user: 'sql7604608',
    password: 'P@$sw0rd',
    // password: 'vVUNEWxAc4',
    // password: 'U5CyZcIQgA',
    // password: 'BqkmN6zj3a',
    // database: 'theklinkers_blog_db'
    database: 'KdtTVr9JSa'
    // database: 'sql7604608'
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

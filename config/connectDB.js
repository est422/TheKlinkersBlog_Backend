const mysql = require('mysql2');

const config = {
    // host: 'localhost',
    host: 'sql11.freesqldatabase.com',
    // user: 'root',
    user: 'sql11648877',
    // password: 'P@$sw0rd',
    password: '4IIRnswqNM',
    // database: 'theklinkers_blog_db'
    database: 'sql11648877'

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

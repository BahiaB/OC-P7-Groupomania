
const mysql = require('mysql2');
require('dotenv').config();
//const HOST = process.env.HOST;
//const USER = process.env.USER;
////const PORT = process.env.PORT;
const PASSWORD = process.env.PASSWORD;
//const DATABASE = process.env.DATABASE;
/*console.log(HOST)
console.log(PASSWORD)
console.log(DATABASE)
console.log(PORT)*/
    
   


    const db = mysql.createConnection({
        host     : "127.0.0.1",
        user     :  "root",
        port: '3306',
        password : PASSWORD,  
        database: "Groupomania"
        
        
    }
    );
    //console.log(db);
    
    db.connect((err) => {
        
        if (err) {
            console.log(err);
            return console.error('error connecting: ' + err.stack);
        }
        console.log('Mysql connected');  
    });
    
    module.exports.getDB = () => {
        return db
    }
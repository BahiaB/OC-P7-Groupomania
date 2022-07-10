
const mysql = require('mysql2');
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

    const db = mysql.createConnection({
        host     : DB_HOST,
        user     :  DB_USER,
        port: DB_PORT,
        password : DB_PASSWORD,  
        database: "groupomania"
        
        
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
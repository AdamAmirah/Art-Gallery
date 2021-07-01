const DB = require("../config.json")

const config = { host: DB.host, database: DB.database, user: DB.user, password: DB.password}
const mysql = require('mysql');

let pool = mysql.createPool(config)

exports.getArtwork= async() =>{
     try{
        const response = await new Promise((resolve, reject)=>{
            const query = `
                CALL listExpensiveArt() 
                `;
            pool.query(query , (err, results) =>{
                if(err)reject(new Error(err.message));
                resolve(results)
            })
        })
        return response;
    }catch(err){
        console.log(err);
     }
}



const DB = require("../config.json")

const config = { host: DB.host, database: DB.database, user: DB.user, password: DB.password}
const mysql = require('mysql');

let pool = mysql.createPool(config)
exports.getCustomers= async() =>{
     try{
        const response = await new Promise((resolve, reject)=>{
            const query = "select * from customer";
            pool.query(query, (err, results) =>{
                if(err)reject(new Error(err.message));
                resolve(results)
            })
        })
        return response;
    }catch(err){
        console.log(err);
     }
}


exports.getCustomerName= async(id) =>{
    try{
       const response = await new Promise((resolve, reject)=>{
           const query = "select CONCAT(F_Name, ' ', L_Name) AS customer_name from customer where CustomerID= ?;";
           pool.query(query, id, (err, results) =>{
               if(err)reject(new Error(err.message));
               resolve(results)
           })
       })
       return response;
   }catch(err){
       console.log(err);
    }
}
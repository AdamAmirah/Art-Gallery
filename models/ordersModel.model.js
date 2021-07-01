const DB = require("../config.json")

const config = { host: DB.host, database: DB.database, user: DB.user, password: DB.password}
const mysql = require('mysql');

let pool = mysql.createPool(config)

exports.getOrders = async (id)=>{
    try{
        const response = await new Promise((resolve, reject)=>{
            const query = `
                            select CONCAT(c.F_Name, ' ', c.L_Name) AS customer_name , O.customerID , ArtID, price, OrderID , Order_Date
                            from customer c , order_art o
                            where c.customerID = o.customerID AND o.customerID = ?;
                           `;
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


exports.addOrder = async (info)=>{
    try{
        const response = await new Promise((resolve, reject)=>{
            let query = `
                            select OrderID from order_art
                            where OrderID = ?
                           `;
            pool.query(query, info.OrderID , (err, results) =>{
                if(err)reject(new Error(err.message));
                if(results.length === 0){
                    query = 'select ArtID, Price from artwork where ArtID = ?;';
                    pool.query(query, info.ArtID , (err, result) =>{
                         if(result.length !== 0){
                             //insert new order
                             query = 'INSERT INTO order_art(OrderID, Price, Order_Date, ArtID, CustomerID) VALUES(?,?,?,?,?)'
                             pool.query(query, [info.OrderID, result[0].Price,info.Order_Date, info.ArtID, info.CustomerID] , (err, order) =>{
                                if(err)reject(new Error(err.message));
                                resolve(order)
                             })
                         }
                         else{
                             //error
                             reject(new Error('No Arwork with such ID'))
                         }
                    })

                }
                else{
                    //reject error
                     reject(new Error('Order ID is Already used'))
                }
                
            })
        })
        return response;
    }catch(err){
        //console.log(err);
         throw err
     }
}


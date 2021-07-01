const DB = require("../config.json")

const config = { host: DB.host, database: DB.database, user: DB.user, password: DB.password}
const mysql = require('mysql');

let pool = mysql.createPool(config)

exports.getExhib= async() =>{
     try{
        const response = await new Promise((resolve, reject)=>{
            const query = "select * from exhibition";
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


exports.updateExhibition = async (info)=>{
    try{
        const response = await new Promise((resolve, reject)=>{
            const query = `
                            UPDATE exhibition 
                            SET
                                E_Name = COALESCE(?,E_Name),
                                Start_Date =  COALESCE(?,Start_Date),
                                End_Date =  COALESCE(?,End_Date)

                            WHERE ExhibitionID = ?
                           `;
            pool.query(query,[info.E_Name, info.Start_Date, info.End_Date,parseInt(info.ExhibitionID)], (err, results) =>{
                if(err)reject(new Error(err.message));
                resolve(results)
            })
        })
        return response;
    }catch(err){
        console.log(err);
     }
}

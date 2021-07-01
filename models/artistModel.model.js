const DB = require("../config.json")

const config = { host: DB.host, database: DB.database, user: DB.user, password: DB.password}

const mysql = require('mysql');

let pool = mysql.createPool(config)

exports.getArtist = async (id)=>{
    try{
        const response = await new Promise((resolve, reject)=>{
            const query = `
                            select * from artist where ArtistID = ?
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

exports.getArtists= async() =>{
     try{
        const response = await new Promise((resolve, reject)=>{
            const query = ` 
            select distinct(ar.artistID) as artistID, price , image,  CONCAT( ar.F_Name, ' ', ar.L_Name ) AS Artist_name  , Art_title
            from artwork a , artist ar
            where a.ArtistID = ar.ArtistID  AND a.price =
                 (
                     SELECT MAX(a.price)
                     FROM artwork a
                     WHERE a.ArtistID = ar.ArtistID
                 )
            group by ar.artistID;
                           `;
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



exports.deleteArtist = async (id)=>{
    try{
        const response = await new Promise((resolve, reject)=>{
            const query = `
                        delete from artist 
                        where ArtistID = ?;
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

exports.updateArtist = async (info)=>{
    try{
        const response = await new Promise((resolve, reject)=>{
            const query = `
                            UPDATE artist
                            SET
                                F_Name = COALESCE(?,F_Name),
                                L_Name =  COALESCE(?,L_Name),
                                Phone_Number =  COALESCE(?,Phone_Number),
                                Age =  COALESCE(?,Age),
                                city =  COALESCE(?,city)
                                
                            WHERE ArtistID= ?
                           `;
            pool.query(query,[info.F_Name, info.L_Name, info.Phone_Number, info.Age, info.city,info.ArtistID], (err, results) =>{
                if(err)reject(new Error(err.message));
                resolve(results)
            })
        })
        return response;
    }catch(err){
        console.log(err);
     }
}


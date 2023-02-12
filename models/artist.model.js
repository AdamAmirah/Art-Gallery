const pool = require("../database");

exports.getArtist = async (id) => {
  try {
    const query = `SELECT * FROM artist WHERE ArtistID = ?`;
    const response = await pool.query(query, id);
    return response;
  } catch (err) {
    console.log(err);
  }
};

exports.getArtists = async () => {
  try {
    const query = ` 
            SELECT DISTINCT(ar.artistID) AS artistID,
              (
                SELECT MAX(a.price)
                FROM artwork a
                WHERE a.ArtistID = ar.ArtistID
              ) AS price,
              image,
              CONCAT( ar.F_Name, ' ', ar.L_Name ) AS Artist_name,
              Art_title
            FROM artwork a
            JOIN artist ar ON a.ArtistID = ar.ArtistID
            GROUP BY ar.artistID, Artist_name, Art_title, image;
            `;

    const response = await pool.query(query);
    return response;
  } catch (err) {
    console.log(err);
  }
};

exports.deleteArtist = async (id) => {
  try {
    const query = `delete from artist where ArtistID = ?;`;
    const response = await pool.query(query, id);
    return response;
  } catch (err) {
    console.log(err);
  }
};

exports.updateArtist = async (info) => {
  try {
    const query = `
          UPDATE artist
          SET
            F_Name = COALESCE(?,F_Name),
            L_Name =  COALESCE(?,L_Name),
            Phone_Number =  COALESCE(?,Phone_Number),
            city =  COALESCE(?,city)
            Age =  COALESCE(?,Age),
          WHERE ArtistID= ?
          `;

    const response = await pool.query(query, [
      info.F_Name,
      info.L_Name,
      info.Phone_Number,
      info.Age,
      info.city,
      info.ArtistID,
    ]);
    return response;
  } catch (err) {
    console.log(err);
  }
};

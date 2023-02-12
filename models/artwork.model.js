const pool = require("../database");

exports.getArtwork = async () => {
  try {
    const query = `CALL listExpensiveArt()`;
    const response = await pool.query(query);
    return response;
  } catch (err) {
    console.log(err);
  }
};

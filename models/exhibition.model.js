const pool = require("../database");

exports.getExhibitions = async () => {
  try {
    const query = "SELECT * FROM exhibition";
    const response = await pool.query(query);
    return response;
  } catch (err) {
    console.log(err);
  }
};

exports.updateExhibition = async (info) => {
  try {
    const query = `
                    UPDATE exhibition 
                    SET
                      E_Name = COALESCE(?,E_Name),
                      Start_Date =  COALESCE(?,Start_Date),
                      End_Date =  COALESCE(?,End_Date)

                    WHERE ExhibitionID = ?
                  `;
    const response = await pool.query(query, [
      info.E_Name,
      info.Start_Date,
      info.End_Date,
      parseInt(info.ExhibitionID),
    ]);
    return response;
  } catch (err) {
    console.log(err);
  }
};

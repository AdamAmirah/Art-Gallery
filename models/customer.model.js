const pool = require("../database");

exports.getCustomers = async () => {
  try {
    const query = "SELECT * FROM customer";
    const response = await pool.query(query);
    return response;
  } catch (err) {
    console.log(err);
  }
};

exports.getCustomerName = async (id) => {
  try {
    const query =
      "SELECT CONCAT(F_Name, ' ', L_Name) AS customer_name FROM customer WHERE CustomerID= ?;";
    const response = await pool.query(query, id);
    return response;
  } catch (err) {
    console.log(err);
  }
};

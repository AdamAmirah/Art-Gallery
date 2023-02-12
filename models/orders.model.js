const pool = require("../database");

exports.getOrders = async (id) => {
  try {
    const query = `
                    SELECT CONCAT(c.F_Name, ' ', c.L_Name) AS customer_name , o.CustomerID , ArtID, price, OrderID , Order_Date
                    FROM customer c , order_art o
                    WHERE c.CustomerID = o.CustomerID AND o.CustomerID = ?;
                    `;
    const response = await pool.query(query, id);
    return response;
  } catch (err) {
    console.log(err);
  }
};

exports.addOrder = async (info) => {
  try {
    let query = `SELECT OrderID FROM order_art WHERE OrderID = ?`;
    let orderID = await pool.query(query, info.OrderID);
    if (orderID.length === 0) {
      query = "SELECT ArtID, Price FROM artwork WHERE ArtID = ?;";
      let artworkID = await pool.query(query, info.ArtID);
      if (artworkID.length !== 0) {
        //insert new order
        query =
          "INSERT INTO order_art(OrderID, Price, Order_Date, ArtID, CustomerID) VALUES(?,?,?,?,?)";
        const response = await pool.query(query, [
          info.OrderID,
          artworkID[0].Price,
          info.Order_Date,
          info.ArtID,
          info.CustomerID,
        ]);
        return response;
      } else {
        throw new Error("No Artwork with such ID");
      }
    } else {
      throw new Error("Order ID is Already used");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const artworkModel = require("../models/artwork.model");
const artistModel = require("../models/artist.model");
const exhibitionModel = require("../models/exhibition.model");
const customerModel = require("../models/customer.model");

exports.getHome = async (req, res, next) => {
  try {
    let arts = await artworkModel.getArtwork();
    let artists = await artistModel.getArtists();
    let exhibitions = await exhibitionModel.getExhibitions();
    let customers = await customerModel.getCustomers();
    res.render("index", {
      artwork: arts,
      artists: artists,
      exhibitions: exhibitions,
      customers: customers,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

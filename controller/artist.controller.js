const validationResult = require("express-validator").validationResult;
const artistModel = require("../models/artist.model");

exports.getArtist = async (req, res, next) => {
  id = req.params.id;
  try {
    let artists = await artistModel.getArtist(id);
    res.render("artist", {
      info: artists,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUpdateArtist = (req, res, next) => {
  res.render("update-artist", {
    id: req.params.id,
  });
};

exports.deleteArtist = (req, res, next) => {
  id = req.params.id;
  let result = artistModel.deleteArtist(id);
  result
    .then((results) => {
      console.log(results.affectedRows);
      res.redirect("/");
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArtist = (req, res, next) => {
  if (req.body.age == "") req.body.age = null;
  if (req.body.phone == "") req.body.phone = null;
  if (req.body.lname == "") req.body.lname = null;
  if (req.body.fname == "") req.body.fname = null;
  if (req.body.city == "") req.body.city = null;

  artistModel
    .updateArtist({
      ArtistID: req.params.id,
      F_Name: req.body.fname,
      L_Name: req.body.lname,
      Age: req.body.age,
      city: req.body.city,
      Phone_Number: req.body.phone,
    })
    .then((results) => {
      res.redirect(`/artist/${req.params.id}`);
    })
    .catch((err) => {
      next(err);
    });
};

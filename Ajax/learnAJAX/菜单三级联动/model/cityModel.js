let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let cityRules = new Schema();

let citiesModel = mongoose.model("cities",cityRules);
module.exports = citiesModel;
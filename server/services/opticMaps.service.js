const HttpStatus = require("../constants/HttpStatus");
const tokenServ = require("../services/token.service");
const SatelliteRequestDto = require("./../models/rawSatelliteDataRequestObject")
  .SatelliteRequestDto;
const errorServ = require("../services/error.service");
const ramani = require("ramani");
const https = require("https");
const date = require("date-and-time");
var fs = require("fs");
request = require("request");
var randomId = require("random-id");
var path = require("path");
exports.generateMap = async function(latitude, longitude) {
  const len = 30;
  const pattern = "aA0";

  const id = randomId(len, pattern);

  var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", callback);
    });
  };

  let centerLongitude = parseFloat(longitude);
  let centerLatitude = parseFloat(latitude);
  let endDate = new Date();
  let startDate = date.addDays(endDate, -8);
  console.log("hello");

  let bboxString = `${centerLongitude - 0.2},${centerLatitude -
    0.07},${centerLongitude + 0.2},${centerLatitude + 0.07}`;
  try {
    console.log("hey");
    download(
      `https://ramani.ujuizi.com/cloud/getimage?token=bun99q5ti8js3m7aptmnckcrg4&user=emiliocortina2&WIDTH=540&HEIGHT=304&BBOX=${bboxString}&FILENAME=image.tiff&TIME=${startDate.toISOString()}/${endDate.toISOString()}/P1D&cloudinnes=80&FORMAT=image/png`,
      `./images/satellite/optic/${id}.png`,
      function(err) {
        if (err) {
          console.log(`Error downloading image ${id}.png`);
        }
      }
    );
    return `${id}.png`;
  } catch (err) {
    return null;
  }
};

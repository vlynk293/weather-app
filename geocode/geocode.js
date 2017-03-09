const request = require('request');

var geocodeAdress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Google Servers');
    } else if(body.status === 'ZERO_RESULTS') {
      callback('Unale to find the address');
    } else if(body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAdress
};

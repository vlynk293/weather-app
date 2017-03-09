const express = require('express');

const geocode = require('./geocode/geocode.js');
const forecast = require('./weather/weather.js');

const port = process.env.PORT || 3000;

var app = express();

app.get('/getWeather/:address', function (req, res) {

  geocode.geocodeAdress(req.params.address, (errorMessages, results) => {
    if(errorMessages){
      res.send(errorMessages);
    } else{
      forecast.getWeather(results.lat, results.lng, (weatherErrors, weatherResults) => {
        if(weatherErrors) {
          res.send(weatherErrors);
        } else{
          res.send(weatherResults);
        }
      });
    }
  });


})


app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

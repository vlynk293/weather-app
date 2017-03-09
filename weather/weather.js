const request = require('request');
const API_KEY = '49ed91eb49248db3d6158503f7619c50';

var getWeather = (lat, lng, callback)=> {
  request({
    url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to forecast.io servers');
    } else if (response.statusCode == 400) {
      callback('Unable to fetch weather');
    } else if(response.statusCode === 200) {
      callback(undefined, body.currently);
    }
  });
}

module.exports = {
  getWeather
};

const yargs = require('yargs');
const axios = require('axios');

const API_KEY = '49ed91eb49248db3d6158503f7619c50';

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`;

  console.log(`Getting weather info in ${response.data.results[0].formatted_address}`);
  return axios.get(weatherUrl);
}).then((response) => {
  console.log(response.data.currently);
}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect to Servers');
  } else{
    console.log(e.message);
  }
});

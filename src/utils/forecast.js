
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const urlWeatherStack = 'http://api.weatherstack.com/current?access_key=e9a8a8f2772288876dcf337f4aa5aab3&query='
        + encodeURIComponent(latitude) + encodeURIComponent(',') + encodeURIComponent(longitude) + '&units=f';

    request(urlWeatherStack, { json: true }, (error, { body }) => {


        if (error) {
            callback('Could not connect to weather service', undefined);
        } else if (body.error) {
            callback('Incorrect coordinates', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current;
            const result = weather_descriptions[0] + '. It is currently '
                + temperature + ' degrees out. It feels like '
                + feelslike + ' degrees.';
            callback(undefined, result);
        }
    });

};

module.exports = forecast;
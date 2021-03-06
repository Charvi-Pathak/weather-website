const request = require('request');

const geocode = (address, callback) => {
    const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hhcnZpcCIsImEiOiJja2NnZmhwamswam55MndscG9sY21pOXVvIn0.7xaPzQfrE1chJhfiMLSykg`;
    request(urlMapBox, { json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another place', undefined)
        } else {
            const { center, place_name } = body.features[0];

            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geocode;
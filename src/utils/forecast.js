const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/76733e9c3ca293ed6de639d3d5bf874f/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';
    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Connection error', undefined);
        } else if (body.error) {
            callback('URL error', undefined);
        } else {
            callback(undefined, {
                description: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast;

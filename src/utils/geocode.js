const request = require('request')

const geocode = (address, callback)  =>  {
    const url =  'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFwcm9tdSIsImEiOiJjazE1cjI5MmMweHlvM2Nyc21ydGRkeXpkIn0.Q7DcuMuMMBdVUqwbJ2nEnA'
    request({url: url, json: true}, (error, { body }) =>  {
      if (error)  {
          callback('Connection error', undefined)
      } else if (body.features.length == 0)  {
        callback('Invalid address', undefined)
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name,
        })
      }
    })
}

module.exports = geocode

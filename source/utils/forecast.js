const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=0e3697f9ac4f677e44ce421283ad5960&query=' + latitude + ',' + longitude ;
    request({ url, json: true, }, (error, { body }) => {
        
        const { error: requestError, current } = body; 

        if (error) {
            callback('Unable to connect to weather services');
        } else if (requestError) {
            callback('Unable to find location');
        } else {
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degrees. It feels like ' + current.feelslike + ' degrees.');
        }
    })
}

module.exports = forecast;
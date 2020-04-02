const request = require('request')

const forecast = ({latitude: lat, longitude: long}, callback) => {

    const url = "https://api.darksky.net/forecast/f7e2c11b0849d52bf456c203acc50983/" + lat + "," + long + "?units=si"

    request({
        url,
        json: true
    },
    (error, {body}) => {

        if(error){
            callback("Network error getting the weather info")
        }
        else if(body.error){
            callback("Unable to get weather info for this location")
        }
        else{
            const data = body.currently
            const temp = data.temperature
            const precipProbability = data.precipProbability
            const msg = body.daily.data[0].summary + " It is currently " + temp + " degrees (C) out. There is a " + precipProbability + "% chance of rain."
            callback(undefined, msg)
        }

    })

}

module.exports = forecast
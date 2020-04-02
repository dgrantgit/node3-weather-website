const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGdyYW50ODkiLCJhIjoiY2s4ZnlkNHgwMDE4ZjNlbGRnaWFpYnIyaSJ9.1x4RmmyLxh9ksI66axl1Mg&limit=1'

    request({
        url,
        json: true
    }
    ,
    (error,{body}) => {
        if(error){
            callback('Unable to connect to location services')
        }
        else if(!body.features.length){
            callback('Unable to find location. Try another search.')
        }
        else{
            callback(undefined, {
                place_name: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    }
    )

}

module.exports = geocode
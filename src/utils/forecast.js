const request = require('request')


const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/899d53222bdd8193f034047621694e35/'+latitude+','+longitude+'?units=si'

        request({url, json:true} , (error,{body}) => {
            if (error){
                callback('Unable to connect o weather service!',undefined)
            } else if (body.error){
                callback('Unable to find location',undefined)
            }else {
                callback(undefined, body.daily.data[0].summary + " It is currently "+ body.currently.temperature + ". There is " + body.currently.precipProbability + " Chance of rain")
            }

        })
    
} 


module.exports = forecast
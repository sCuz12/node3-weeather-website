
const path = require('path')
const express = require('express')

const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Custom paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath) //Tell the express to use the custom viewPath 
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res) => {
    res.render('index', {
        title:'Weather App',
        name : 'George hadjisavvas'
    })
})


app.get('/about',(req,res) => {
    res.render('about', {
        title:'About me',
        name : 'George Hadjisavvas'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'Help page',
        message : 'ASDASDASD',
        name : 'George Hadjisavvas'
    })
})

//first argument = route , second = function 
app.get('/help', (req,res) => {
    res.send([{
        name : 'George',
        age : 25
    },{
        name:'sara'
    }])
})



app.get('/weather',(req,res)=> {

    if(!req.query.address){
        return res.send({
            error : 'You must Provide Address'
        })
    }

      //bellow destructruring the object in the second parameter
      geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if (error){
            //return stops the function excecution
            return res.send({error})
        } 
        forecast(latitude, longitude , (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            return res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
          })
    }) 
})


app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error : 'You must Provide a search term'
        })
    }

})

app.get('/help/*',(req,res)=> {

    res.render('error404', {
        title : '404',
        message : 'Help article not found',
        name : "George Hadjisavvas"
    })
})

app.get('*',(req,res) => {
    res.render('error404', {
        title : '404',
        message : 'Page  not found',
        name : "George Hadjisavvas"
    })
    
})


app.listen(port,()=>{
    console.log('Server Started on port ' + port)
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Golden Rich'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Golden Rich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'The help page',
        name: 'Golden Rich'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send(
            "Enter a valid address term"
        )
    }
    
    //grab geocode location first.
    geocode(req.query.address, (error, data) => {
        if(error){
            res.send({
                error: "I can't seem to find that address, please try again"
            })
            console.log(error)
        }
        else{
            //should have data so can proceed to call forecast
            forecast(data, (error, forecastData) => {
                if(error){
                    res.send({
                        error: "I can't seem to get the forecast for " + data.place_name + ", please try again"
                    })
                }
                else{
                    //should have everything we need to send the data back to browser
                    res.send({
                        forecast: forecastData,
                        location: data.place_name,
                        address: req.query.address
                    })
                }
            })
        }
    })

    console.log(req.query)

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Golden Rich',
        message: 'Sorry, this page could not be found. It looks like you were looking for a help page article?'
    })
})

//catch all for 404 pages
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Golden Rich',
        message: 'Sorry, this page could not be found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// define paths | express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(__dirname)
console.log(publicDirectoryPath)

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Marin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Marin'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:  'Article not found',
        name: 'Marin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) res.send({
        error: 'You need to provide a address'
    })
    else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) res.send({ error: error })
            else forecast(longitude, latitude, (error, { description, temperature, chanceOfRain } = {}) => {
                if (error) res.send({ error: error })
                else res.send({
                    forecast: description + ' the temperature is ' + temperature + ' and the chance of rain is '+ chanceOfRain,
                    address: req.query.address,
                    location: location,
                    description: description,
                    temperature: temperature,
                    chanceOfRain: chanceOfRain
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) return res.send({
        error: 'You need to provide a search term'
    })
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Marin'
    })
})

app.listen(3000, () => {
    console.log("Server up in 3000")
})

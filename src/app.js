const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const name = 'Charvi Pathak';

// Define Paths for Express and HBS config
const pathToPublicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

console.log(partialsPath);

// Set up Express and HBS configurations
app.use(express.static(pathToPublicDir))

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT ME',
        name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        helpMsg: 'Please mail at helpdesk@hotmail.com',
        name
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide an address' });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            res.send({ error });
            return;
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                res.send({ error });
                return;
            }
            console.log('Data: ', forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

});


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg404: 'Help Article Not Found',
        title: '404',
        name
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg404: '404 - Oops! Page Not Found',
        title: '404',
        name
    })
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
});
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Esteban Martinez'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Esteban Martinez'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'You can email our support group here: patchfact@gmail.com',
        name: 'Esteban Martinez'
    });
});

app.get('/weather', (req, res) => {
    
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'No address has been provided.'
        });
    }
    
    geocode(address, (geocodeError, { latitude, longitude, location } = {}) => {
        if (geocodeError) {
            return res.send({
                error: geocodeError
            });
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: address
            });
        });
    });
});

// 404 Handlers
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This help article could not be found.',
        name: 'Esteban Martinez'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 Page Not Found.',
        name: 'Esteban Martinez'
    });
});

// Server connection
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
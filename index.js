// app.get(etc. etc.) = your endpoint

// Imports
const express = require('express')
const mongoose = require('mongoose')

// Middleware
const helmet = require('helmet')
const morgan = require('morgan')
const middlewareLogger = require('./middleware/middlewareLogger')
const config = require('config')

console.log(config.get('name'));

// Routes
const home = require('./routes/home')
const providers = require('./routes/providers')
const products = require('./routes/products')

// Attach Express to our app
const app = express()

mongoose.connect('mongodb://localhost/providerAPI')
    .then(()=>{ console.log('Connected to MongoDB')})
    .catch((err => { console.log('error', err); }))

// Log what Mode we're in, and run certain pieces of middleware in said mode
// Change to Production: $env:NODE_ENV=production
// Change to Development: $env:NODE_ENV=development
console.log(app.get('env'))
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

// Allows Express to read JSON data
app.use(express.json())
// URLencoded allows us to pull querys from address bar
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
// creates endpoints for everything within the 'public' folder
// useful for images for certain providers etc.
app.use(express.static('public'))
app.use(middlewareLogger)


// Main addresses
app.use('/', home);
app.use('/api/providers', providers);
app.use('/api/products', products);


// Listen on the servers port, OR 3000
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log('Listening on Port: 3000'))
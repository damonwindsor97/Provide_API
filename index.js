// Imports
const express = require('express')
const Joi = require('joi')
const middlewareLogger = require('./middleware/middlewareLogger')
const helmet = require('helmet')
const morgan = require('morgan')

// Attach Express to our app
const app = express()

// Allows Express to read JSON data
app.use(express.json())
// URLencoded allows us to pull querys from address bar
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(middlewareLogger)

// Log what Mode we're in, and run certain pieces of middleware in said mode
// Change to Production: $env:NODE_ENV=production
// Change to Development: $env:NODE_ENV=development
console.log(app.get('env'))
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

// Dummy DB
const providers = [
    {id: 1, name: 'Exspira Cheats'},
    {id: 2, name: 'AimBoss'},
    {id: 3, name: 'eCyler'},
    {id: 4, name: 'Juba Games'}
]

// app.get(etc. etc.) = your endpoint

// Create initial homepage (will be website homepage eventually)
app.get('/', (req, res)=> {
    res.send('Welcome to Swegs Cheat Provider API')
})

// Initial Provider endpoint
//  GET all Providers
app.get('/api/providers', (req, res) => {
    res.send(providers)
})

// GET Provider by ID
app.get('/api/providers/:id', (req, res) => {
    const provider = providers.find(p=> p.id === parseInt(req.params.id))

    // Very simple Validation
    if(!provider) res.status(404).send('This Provider ID was not found!')
    // send it off
    res.send(provider)
})


// POST to Endpoint
app.post('/api/providers', (req, res) => {
    // Validation
    const { error } = validateProvider(req.body)
    // If result contains error, send 400 with error message
    if (result.error){
        res.status(400).send(result.error.details)
        return
    }
    const provider ={ id: providers.length + 1, name: req.body.name }
    providers.push(provider)
    res.send(provider)
})

// PUT Endpoint
app.put('/api/providers/:id', (req, res) => {
    // Find provider in database
    const provider = providers.find(p=> p.id === parseInt(req.params.id))
    // If course not found, return error
    if(!provider) res.status(404).send('This Provider ID was not found!')
    // Validate 
    const { error } = validateProvider(req.body)
    // If result contains error, send 400 with error message
    if (error){
        res.status(400).send(result.error.details)
        return
    }
    // Update provider
    provider.name = req.body.name
    // send response back with updated data
    res.send(provider)
})


// DELETE Endpoint
app.delete('/api/providers/:id', function (req, res) {
    const provider = providers.find(p=> p.id === parseInt(req.params.id))
    if (!provider) res.status(404).send('This Provider ID was not found!')
    const index = providers.indexOf(provider)
    providers.splice(index, 1)
    res.send(provider)
})

function validateProvider(provider) {
    // Schema = what the data coming in SHOULD look like
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    // use schema to validate the data user is sending
    return schema.validate(provider)
}

// Listen on the servers port, OR 3000
const port = process.env.PORT || 3000
app.listen(port, ()=> console.log('Listening on Port: 3000'))
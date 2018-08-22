require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const registers = require('./registers')

const app = express()

app.use(express.static('public'))
app.use(cors())


app.get('/', (req, res) => {
    registers.getAll()
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

app.post('/', bodyParser.json(), (req, res) => {    
    registers.saveNewRegister(req.token, req.body)
    .then(
        (data) => res.send(data),
        (error) => {
            if(error.message == "402") {
                res.status(402).send({
                    error: 'Email already registered'
                })
            } else {
                res.status(500).send({
                    error: 'There was an error.'
                })
            }
    })  
})


app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})

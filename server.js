const express = require('express')
const app = express()

app.get('/', (request, response) => response.sendFile(__dirname + '/index.html'))
app.get('/about', (request, response) => response.sendFile(__dirname + '/about.html'))
app.get('/contact-me', (request, response) => response.sendFile(__dirname + '/contact-me.html'))
app.get('*', (request, response) => response.sendFile(__dirname + '/404.html'))


const PORT = 3000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
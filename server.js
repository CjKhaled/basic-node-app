const { createServer } = require('node:http')

const hostname = '127.0.0.1'
const port = 3000;
const url = require('node:url')
const fs = require('node:fs')
const pages = ['404.html', 'about.html', 'contact-me.html']

// helper function to ensure request is valid
function validateRequest(file) {
    if (pages.includes(file)) {
        return true;
    }

    return false
}

// runs anytime someone accesses the server at port 3000
const server = createServer((request, response) => {  
    // formulating response
    if (request.url == '/') {
        // default page
        fs.readFile('index.html', (error, data) => {
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.write(data)
            response.end()
        })
    } else {
        const query = url.parse(request.url, true)
        const filename = query.pathname.substring(1) + '.html'
        
        // request is valid
        if (validateRequest(filename)) {
            fs.readFile(filename, (error, data) => {
                response.writeHead(200, {'Content-Type': 'text/html'})
                response.write(data)
                response.end()
            })
        } 
        
        // request invalid
        else {
            fs.readFile('404.html', (error, data) => {
                response.writeHead(200, {'Content-Type': 'text/html'})
                response.write(data)
                response.end()
            })
        }
        
    }
    
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
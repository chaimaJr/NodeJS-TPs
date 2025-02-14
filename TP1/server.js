// $ npm init -y
// $ npm install http

const http = require('http');

const server = http.createServer((req, res ) => {
    res.writeHead(200, {'ContentType': 'text'} );
    res.end ('Welcome to my first project');

})

const port = 5000
server.listen(port, ()=>{
    console.log('Server running ...');
})


// $ node server.js
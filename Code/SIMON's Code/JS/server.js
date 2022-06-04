const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8080;

const server = http.createServer((req, res) => {
    let filePath = path.join(
        __dirname,
        "",
        req.url === "/" ? "home.html" : req.url
    );

    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    console.log(`File path: ${filePath}`);
    console.log(`Content-Type: ${contentType}`)

    res.writeHead(200, {'Content-Type': contentType});

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

server.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`)
    } else {
        console.log(`Server listening at port ${port}...`);
    }
});
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 80;

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



var fileName = './secret.html';
var stream = fs.createWriteStream(fileName);
 
stream.once('open', function(fd) {
  var html = buildHtml();
  stream.end(html);
});

function buildHtml() {
    var header = '';
    var body = '';
  
    // concatenate header string
    // concatenate body string
  
    return  '<html>'+"blue pick Up"+'</html>';
  };


// var xx = "pick up"
// let $ = require('cheerio').load("./secret.html");
// $('xxx').replaceWith(xx);

server.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`)
    } else {
        console.log(`Server listening at port ${port}...`);
    }
});

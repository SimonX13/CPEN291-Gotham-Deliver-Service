
var fs = require("fs")
,
 cheerio = require("cheerio");//cheerio module

      var htmlPath = './secret.html';

      var outPath = './secret.html';

      var replaceValues = require('./status.json');
    
fs.readFile(htmlPath, { encoding: 'utf-8' }, function(err, html) //read all code from map.html
{
  
  if (err) {
} else {
    const $ = cheerio.load(html);
  for (var key in replaceValues) {////read elements in json file one by one by loop and update corresponding elements in html file
    $('.' + key).html(replaceValues[key]);

        fs.writeFile(outPath, $.html(),function(err){
          if(err){
            throw err;
          }
        });
      }

      
}
      
   
      

          
      });









var fs = require("fs");

var cheerio = require("cheerio");//use cheerio modle

var htmlPath = './map.html';

var outPath = './map.html';

var replaceValues = require('./status2.json');

fs.readFile(htmlPath, { encoding: 'utf-8' }, function (err, html) {//read all codes from map.html
  const $ = cheerio.load(html);
  if (err) {
  } else {
    for (var key in replaceValues) {//check contents in json to update html file and update map status
      if (key == "location") {
        if (replaceValues[key] == 1) {//first side
          $("img").each(function () {//check  every img element and change src in the elements
            var id = $(this).attr("id");
            var url = "map1.gif";
            var new_href = encodeURIComponent(url);
            if (id == "mapgif") {
              $(this).attr("src", new_href);
            }
          });
          fs.writeFile(outPath, $.html(), function (err) {
            if (err) {
              throw err;
            }
          });
        }

        if (replaceValues[key] == 2) {//second side
          $("img").each(function () {
            var id = $(this).attr("id");
            var url = "map2.gif";
            var new_href = encodeURIComponent(url);
            if (id == "mapgif") {
              $(this).attr("src", new_href);
            }
          });
          fs.writeFile(outPath, $.html(), function (err) {
            if (err) {
              throw err;
            }
          });
        }

        if (replaceValues[key] == 3) {//third side
          $("img").each(function () {
            var id = $(this).attr("id");
            var url = "map3.gif";
            var new_href = encodeURIComponent(url);
            if (id == "mapgif") {
              $(this).attr("src", new_href);
            }
          });
          fs.writeFile(outPath, $.html(), function (err) {
            if (err) {
              throw err;
            }
          });
        }

        if (replaceValues[key] == 4) {//fourth side
          $("img").each(function () {
            var id = $(this).attr("id");
            var url = "map4.gif";
            var new_href = encodeURIComponent(url);
            if (id == "mapgif") {
              $(this).attr("src", new_href);
            }
          });
          fs.writeFile(outPath, $.html(), function (err) {
            if (err) {
              throw err;
            }
          });
        }

        if (replaceValues[key] == 5) {//curve
          $("img").each(function () {
            var id = $(this).attr("id");
            var url = "map5.gif";
            var new_href = encodeURIComponent(url);
            if (id == "mapgif") {
              $(this).attr("src", new_href);
            }
          });
          fs.writeFile(outPath, $.html(), function (err) {
            if (err) {
              throw err;
            }
          });
        }

        if (replaceValues[key] == 0) {//resting
          $("img").each(function () {
            var id = $(this).attr("id");
            var url = "mapwait.gif";
            var new_href = encodeURIComponent(url);
            if (id == "mapgif") {
              $(this).attr("src", new_href);
            }
          });
          fs.writeFile(outPath, $.html(), function (err) {
            if (err) {
              throw err;
            }
          });
        }

      }

    }
  }





});









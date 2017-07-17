// scraping tools
// get html from URLs
var request = require("request-promise");

// Scrapes our HTML
var cheerio = require("cheerio");
var axios = require("axios");

// this will change depending on environment
var stationPage = "http://dbw.scdot.org/Poll5WebAppPublic/wfrm/wfrmViewDataNightly.aspx?DisTbl=T&Site=";

module.exports = function(app) {

    // get request to retrieve site table rows
    // todo: parse and format row data before returning to front-end
    app.get("/api/tables/:id", function(req, res) {
        var options = {
            uri: `${stationPage}${req.params.id}`,
            transform: function (body) {
            return cheerio.load(body);
            }
        };
               
        request(options).then(function ($) {
            // push rows of class .rowWhiteDisplay and .rowNormalDisplay into data array
            let data = [];           
            $(".rowWhiteDisplay,.rowNormalDisplay").each( (index,row) => {
                data.push($(row).html());
            });
            
            res.json( data );
        })
        .catch(function (err) {
            console.log(err); 
        });
    });
};
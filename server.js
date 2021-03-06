// ==================================================
// DEPENDENCIES
//===================================================
const express=require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
var cors = require('cors')
app.use(cors())

const dotenv=require("dotenv");
dotenv.config();

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" })); 

// Static directory
console.log("Path:",__dirname);
app.use(express.static(__dirname + "/public"));

// ===================================================
// ROUTES
// geniusApi routes handle requests to the Genius api.
// mongooseAPI routes handle mongoDB actions.
// htmlRoutes serves the homepage
// ===================================================

require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// ==================================================
// start our server
// ==================================================
app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});
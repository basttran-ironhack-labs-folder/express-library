// connects app.js to the .env file
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

// connects to MongoDB server with the DB name equal to the project name
// (also has console.logs for successful and failed connections)
mongoose
  .connect("mongodb://localhost/express-library", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware setup
// morgan npm package console.logs for every connection to the servee
app.use(logger("dev"));

// creates "request.body" from POST form submissions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// makes cookie available to your server
app.use(cookieParser());

// Express View engine setup

// translates the style.scss file to style.css and style.css.map
// (REMEMBER TO EDIT style.Scss and NOT style.css)
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

// rename the "views/" folder if you want
app.set("views", path.join(__dirname, "views"));

// tells Express to use the "hbs" npm package for our view rendering
app.set("view engine", "hbs");

// tells Express about the static files in the public/ folder
app.use(express.static(path.join(__dirname, "public")));

// connects a favicon image to your server
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title variables in HBS files
app.locals.title = "Express Library";

// connect router files to app.js (more on this later)
// (individuals routes DON'T go in app.js anymore)
const index = require("./routes/index");
app.use("/", index);

// EXPORT the app variable
// (best practice for being able to add testing code for Express)
module.exports = app;

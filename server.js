var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 8080;
// const cors = require('cors');
var db = require("./models");

// allowing cors, installed npm module

// app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "anaBiaJohVer", 
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto", maxAge: 99999}
}));

app.use(express.static("public"));

// // ADDED FOR CORS ISSUE
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

require("./routes/services-api-routes.js")(app);
require("./routes/schedule-api-routes.js")(app);
require("./routes/admin-api-routes.js")(app);
// require("./routes/user-api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});















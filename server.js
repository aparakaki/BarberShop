var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 8081;
var db = require("./models");

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

require("./routes/services-api-routes.js")(app);
require("./routes/schedule-api-routes.js")(app);
require("./routes/admin-api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});















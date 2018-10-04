var express = require("express");

var app = express();
var PORT = process.env.PORT || 8081;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


require("./routes/services-api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize.sync({force: true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

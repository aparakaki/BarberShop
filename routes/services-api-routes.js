var db = require("../models");


module.exports = function(app){
    app.get("/api/services", function(req, res){
        db.Service.findAll({}).then(function(data){
            res.json(data);
        })
    });
}
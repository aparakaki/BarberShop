var db = require("../models");


module.exports = function(app){
    app.get("/api/services", function(req, res){
        db.Service.findAll({}).then(function(data){
            res.json(data);
        })
    });
    app.post("/api/services", function(req, res){
        
        db.Service.create({
            style: req.body.style,
            time: parseInt(req.body.time),
            price: parseFloat(req.body.price),
            description: req.body.description
        }).then(function(data){
            res.json(data);
        })
    });
}
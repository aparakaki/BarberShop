var db = require("../models");


module.exports = function(app){
    app.get("/api/schedule", function(req, res){
        console.log(req.body);
        db.Appointment.findAll({
             where: {date: req.body}
        }).then(function(data){
            res.json(data);
        })
    });

    app.post("/api/schedule", function(req, res) {
        db.Appointment.create(req.body).then(function(data){
            res.json(data);
        })
    })
}
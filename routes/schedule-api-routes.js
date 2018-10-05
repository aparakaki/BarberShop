var db = require("../models");


module.exports = function(app){
    app.get("/api/schedule/:date", function(req, res){
        console.log(req.params.date);
        db.Appointment.findAll({
            where: {date: req.params.date}
        }).then(function(data){
            res.json(data);
        })
    });

    app.post("/api/schedule", function(req, res) {
        db.Appointment.create(req.body).then(function(data) {
            res.json(data);
        })
    })
}
var db = require("../models");


module.exports = function(app){

    // user routes
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
        });
    });

    app.get("/api/history/:id", function(req, res){
        db.Appointment.findAll({
            where: {id: req.params.id}
        }).then(function(data){
            res.json(data);
        });
    });

    app.get("/api/user/:id", function(req, res){
        db.User.findOne({
            where: {id: req.params.id}
        }).then(function(data){
            res.json(data);
        })

    });


    //admin routes
    app.get("/api/admin-schedule", function(req, res){
        db.Appointment.findAll({}).then(function(data){
            res.json(data);
        })
    })


}
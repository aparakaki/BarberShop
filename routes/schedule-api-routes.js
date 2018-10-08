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

    app.get("/api/history/:id/:complete", function(req, res){
        db.Appointment.findAll({
            where: {UserId: req.params.id, completed: req.params.complete},
            include: [{
                model: db.Service
        }],
        order: [
            ['date', 'ASC'],
            ['start', 'ASC'],
        ]
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



    app.post("/api/details", function(req, res) {
        db.Detail.create(req.body).then(function(data) {
            res.json(data);
        })
    })


}
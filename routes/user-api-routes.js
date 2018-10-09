var db = require("../models");


module.exports = function(app){

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

    app.delete("/api/appointment/:id", function(req, res) {
        console.log(req.params.id);
        db.Appointment.destroy({
            where: {
                id: req.params.id
            }
        }).then(function() {
            res.end();
        })
    })
}
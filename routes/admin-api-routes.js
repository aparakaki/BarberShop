var db = require("../models");


module.exports = function(app){
    app.get("/admin/api/appointments", function(req, res){
        db.Appointment.findAll({
            include: [{
                    model: db.Service
            }],
            order: [
                ['date', 'ASC'],
                ['start', 'ASC'],
            ]
        }).then(function(data){
            res.json(data);
        })
    });

    app.get("/api/customer/:id", function(req, res){
        db.User.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(data){
            res.json(data);
        })
    });

}
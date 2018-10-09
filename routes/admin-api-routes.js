var db = require("../models");


module.exports = function(app){
    app.get("/api/appointments/:complete", function(req, res){
        db.Appointment.findAll({
            where: {
                completed: req.params.complete
            },
            include: [{
                model: db.Service
            }],
            order: [
                ['date', 'ASC'],
                ['start', 'ASC'],
            ]
        }).then(function (data) {
            res.json(data);
        })
    });

    app.get("/api/customer/:id", function (req, res) {
        db.User.findAll({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    });

    // set local storage
    app.get("/setLocalStorage", function (req, res) {
        db.User.findOne({
            where: {
                username: req.session.user.username
            }
        }).then(function (data){
            res.json(data);
        })
    });

    app.get("/setLocalStorageAdmin", function (req, res) {
        db.User.findOne({
            where: {
                username: req.session.user.username
            }
        }).then(function (data){
            res.json(data);
        })
    });

}
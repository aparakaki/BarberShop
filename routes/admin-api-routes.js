var db = require("../models");


module.exports = function (app) {
    app.get("/api/appointments/:complete", function (req, res) {
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
        if (req.session.user) {
            db.User.findOne({
                where: {
                    username: req.session.user.username
                }
            }).then(function (data) {
                res.json(data);
            })
        }
    });

    app.get("/setLocalStorageAdmin", function (req, res) {
        db.User.findOne({
            where: {
                username: req.session.user.username
            }
        }).then(function (data) {
            res.json(data);
        })
    });

    app.delete("/api/services/delete", function (req, res) {
        console.log(req.body);
        db.Service.destroy({
            where: { id: req.body.id }
        }).then(function (data) {
            res.json(data);
        });
    });


    app.put("/api/services/edit", function (req, res) {
        db.Service.update({
            price: req.body.newPrice
        }, {
                where: { id: req.body.id }
            }).then(function (data) {
                res.json(data);
            })
    });

    app.post("/api/appointment", function (req, res) {
        db.Appointment.create(req.body)
            .then(function (data) {
                res.json(data);
            })
    })
};
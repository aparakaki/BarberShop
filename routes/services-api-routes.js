var db = require("../models");


module.exports = function(app){
    app.get("/api/services", function(req, res){
        db.Service.findAll({}).then(function(data){
            res.json(data);
        })
    });

    app.get("/api/calendar", function(req, res){
        db.Appointment.findAll({
            where: {
                date: "2018-10-04"
            }
        }).then(function(data) {
            // console.log(data);
            res.json(data);
        })
    }) 
}
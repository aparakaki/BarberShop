var db = require("../models");


module.exports = function(app){
    app.get("/api/schedule", function(req, res){
        db.Appointment.findAll({
            // where: {date: date from the front end}
        }).then(function(data){
            res.json(data);
        })
    })
}
var db = require("../models");


module.exports = function(app){
    app.get("/api/schedule/:id", function(req, res){
        db.Appointment.findAll({
             where: {date: req.params.id}
        }).then(function(data){
            res.json(data);
        })
    })
}
var path = require("path");
var db = require("../models");


module.exports = function (app) {
    app.get("/", function (req, res) {
        if (req.session.user) {
            res.redirect("/services");
        }
        else if (req.cookie) {
            db.User.findOne({
                where: {
                    token: req.cookie.token
                }
            }).then(function (token) {
                if (token !== null) {
                    req.session.user = user[i];
                    res.redirect("/services");
                }
            });
        }
        else {
            res.sendFile(path.join(__dirname, "../index.html"));
        }
    });

   

    app.get("/services", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/admin/create-service.html"));
        // }
        // else {
            // res.redirect("/");
        // }
    });
    

    // routes for admin
    app.get("/adminHome", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/admin/admin-home.html"));
        // }
        // else {
            // res.redirect("/");
        // }
    });

    app.get("/adminCurrentAppt", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/admin/current-appointments.html"));
            
        // }
        // else {
            // res.redirect("/");
        // }
    });

    app.get("/adminCreateServices", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/admin/create-service.html"));
        // }
        // else {
            // res.redirect("/");
        // }
    });

        // routes for user pages
        //sending html indexes into its place
        app.get("/userHome", function (req, res) {
            // if (req.session.user) {
                res.sendFile(path.join(__dirname, "../public/home-page/home-page.html"));
            // }
            // else {
                // res.redirect("/");
            // }
        });

        app.get("/userHistory", function (req, res) {
            // if (req.session.user) {
                res.sendFile(path.join(__dirname, "../public/home-page/history.html"));
            // }
            // else {
                // res.redirect("/");
            // }
        });


        app.get("/userUpcomingAppt", function (req, res) {
            // if (req.session.user) {
                res.sendFile(path.join(__dirname, "../public/home-page/upcoming-appt.html"));
            // }
            // else {
                // res.redirect("/");
            // }
        });

    //
    app.get("/calendar", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/calendar.html"))
        // }
        // else {
            // res.redirect("/");
        // }
    });

    app.get("/user-home", function(req, res){
        res.sendFile(path.join(__dirname, "../public/user-home.html"))
    })

    app.get("/logout", function (req, res) {
        res.clearCookie("token");
        req.session.destroy();

        res.redirect("/");
    });

    app.post("/login", function (req, res) {
        db.User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (token) {
            if (token !== null) {
                var token = "t" + Math.random();
                db.User.update({
                    token: token,
                },
                    {
                        where: {
                            name: req.body.username
                        }
                    }).then(function (dbTodo) { });

                res.cookie("token", token);

                req.session.user = {
                    id: req.body.id,
                    name: req.body.name,
                    password: req.body.password
                }
                return res.redirect("/");
            }
            res.send("account not found");
        });
    });

    app.post("/createLogin", function (req, res) {
        db.User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }).then(function (user) {
            res.redirect("/");
        })
    });

}
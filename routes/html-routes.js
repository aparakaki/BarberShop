var path = require("path");
var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        if (req.session.user) {
            console.log("1");
            if (req.session.user.admin === true) {
                res.redirect("/adminHome");
            }
            else {
                res.redirect("/userHome");
            }
        }
        else if (req.headers.cookie) {
            console.log("2");
            if (req.headers.cookie.match(/(?<=token=)[^ ;]*/) !== null) {
                var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
                db.User.findOne({
                    where: {
                        token: cookie
                    }
                }).then(function (data) {
                    console.log(data);
                    if (data !== null) {
                        req.session.user = {
                            username: req.body.username,
                            password: req.body.password,
                            admin: data.dataValues.admin
                        }
                        return res.redirect("/userHome");
                    }
                    res.clearCookie("token");
                    res.redirect("/");
                });
            }
            else {
                console.log("3");
                res.sendFile(path.join(__dirname, "../index.html"));
            }
        }
        else {
            console.log("4");
            res.sendFile(path.join(__dirname, "../index.html"));
        }
    });

    app.get("/servicesTwo", function (req, res) {
        if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/services.html"));
        }
        else {
            res.redirect("/");
        }
    });

    // routes for admin
    app.get("/adminHome", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                res.sendFile(path.join(__dirname, "../public/admin/admin-home.html"));
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    });
    app.get("/adminCurrentAppt", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                res.sendFile(path.join(__dirname, "../public/admin/current-appointments.html"));
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    });

    app.get("/adminCreateServices", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                res.sendFile(path.join(__dirname, "../public/admin/create-service.html"));
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    });

    // routes for user pages
    //sending html indexes into its place
    app.get("/userHome", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === false) {
                res.sendFile(path.join(__dirname, "../public/home-page/home-page.html"));
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    });

    app.get("/userHistory", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === false) {
                res.sendFile(path.join(__dirname, "../public/home-page/history.html"));
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    });

    app.get("/userUpcomingAppt", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === false) {
                res.sendFile(path.join(__dirname, "../public/home-page/upcoming-appt.html"));
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("/");
        }
    });

    //
    app.get("/calendar", function (req, res) {
        if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/calendar.html"));
        }
        else {
            res.redirect("/");
        }
    });

    //login routes
    app.post("/login", function (req, res) {
        console.log(req.body.keepSignedIn);
        db.User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (data) {
            if (data !== null) {
                var token = "t" + Math.random();
                db.User.update({
                    token: token,
                },
                    {
                        where: {
                            username: req.body.username
                        }
                    }).then(function (dbTodo) { });

                if (req.body.keepSignedIn !== undefined) {
                    res.cookie("token", token, { expires: new Date(Date.now() + 999999999) });
                }

                req.session.user = {
                    username: req.body.username,
                    password: req.body.password,
                    admin: data.dataValues.admin
                }
                console.log(req.session.user);
                return res.redirect("/");
            }
            res.redirect("/userNotFound");
        });
    });

    app.get("/logout", function (req, res) {
        res.clearCookie("token");
        req.session.destroy();

        res.redirect("/");
    });

    app.get("/userNotFound", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/userNotFound.html"))
    });

    app.post("/createLogin", function (req, res) {
        db.User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }).then(function (user) {
            req.session.user = {
                username: req.body.username,
                password: req.body.password,
                admin: false
            }
            res.redirect("/");
        })
    });

    //routes for tablet
    app.get("/tablet", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tablet.html"));
    });

    app.post("/haircutStartTime", function (req, res) {
        db.User.findOne({
            where: {
                userName: req.body.userName
            }
        }).then(function (data) {
            var userId = data.dataValues.id;
            console.log(userId);
            db.Appointment.update({
                serviceStart: req.body.startTime
            }, {
                    where: {
                        UserId: userId
                    }
                }).then(function (user) {
                    res.json(user);
                })
        })

    });

    app.post("/haircutEndTime", function (req, res) {
        // db.User.findOne({
        //     where: {
        //         userName: req.body.userName
        //     }
        // }).then(function (data) {


        //     var userId = data.dataValues.id;
        //     console.log(userId);
        //     db.User.
        //     var userStartTime = data.dataValues.serviceStart;
        //     var userEndTime = parseInt(req.body.endTime);
        //     console.log(userStartTime, userEndTime);
        //     // var totalTime = userEndTime - userStartTime
        //     // db.tabletTrackerTime.update({
        //     //     totalTime: totalTime
        //     // }, {
        //     //         where: {
        //     //             UserId: userId
        //     //         }
        //     //     }).then(function (user) {
        //     //         res.json(user);
        //     //     });
        // });
    })
}
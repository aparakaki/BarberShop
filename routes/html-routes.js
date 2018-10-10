var path = require("path");
var db = require("../models");

module.exports = function (app) {
    app.get("/servicesTwo", function (req, res) {
        if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/services.html"));
        }
        else {
            res.redirect("/loginPage");
        }
    });

    // routes for admin
   
    app.get("/adminCurrentAppt", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                res.sendFile(path.join(__dirname, "../public/admin/current-appointments.html"));
            }
            else {
                res.redirect("/loginPage");
            }
        }
        else {
            res.redirect("/loginPage");
        }
    });

    app.get("/adminCreateServices", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                res.sendFile(path.join(__dirname, "../public/admin/create-service.html"));
            }
            else {
                res.redirect("/loginPage");
            }
        }
        else {
            res.redirect("/loginPage");
        }
    });

    app.get("/adminHome", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === true) {
                res.sendFile(path.join(__dirname, "../public/admin/admin-home.html"));
            }
            else {
                res.redirect("/loginPage");
            }
        }
        else {
            res.redirect("/loginPage");
        }
    });

    // routes for user pages
    //sending html indexes into its place

    // app.get("/userHome", function (req, res) {
    //     if (req.session.user) {
    //         if (req.session.user.admin === false) {
    //             res.sendFile(path.join(__dirname, "../public/home-page/history.html"));
    //         }
    //         else {
    //             res.redirect("/loginPage");
    //         }
    //     }
    //     else {
    //         res.redirect("/loginPage");
    //     }
    // });

    app.get("/userHistory", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === false) {
                res.sendFile(path.join(__dirname, "../public/home-page/history.html"));
            }
            else {
                res.redirect("/loginPage");
            }
        }
        else {
            res.redirect("/loginPage");
        }
    });

    app.get("/userUpcomingAppt", function (req, res) {
        if (req.session.user) {
            if (req.session.user.admin === false) {
                res.sendFile(path.join(__dirname, "../public/home-page/upcoming-appt.html"));
            }
            else {
                res.redirect("/loginPage");
            }
        }
        else {
            res.redirect("/loginPage");
        }
    });

    //
    app.get("/calendar", function (req, res) {
        if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/calendar.html"));
        }
        else {
            res.redirect("/loginPage");
        }
    });

    //login routes
    app.get("/loginPage", function (req, res) {
        if (req.session.user) {
            console.log("1");
            if (req.session.user.admin === true) {
                res.redirect("/adminCurrentAppt");
            }
            else {
                res.redirect("/userUpcomingAppt");
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
                    if (data !== null) {
                        req.session.user = {
                            username: data.dataValues.username,
                            password: data.dataValues.password,
                            admin: data.dataValues.admin
                        }
                        console.log("2.5");
                        return res.redirect("/userHistory");
                    }
                    console.log("3");
                    res.clearCookie("token");
                    res.redirect("/loginPage");
                });
            }
            else {
                console.log("4");
                res.sendFile(path.join(__dirname, "../public/login.html"));
            }
        }
        else {
            console.log("5");
            res.sendFile(path.join(__dirname, "../public/login.html"));
        }
    });

    app.post("/login", function (req, res) {
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
                return res.redirect("/loginPage");
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
        if (req.session.user === undefined) {
            console.log(req.session.user);
            res.sendFile(path.join(__dirname, "../public/userNotFound.html"))
        }
        else {
            res.redirect("/loginPage");
        }
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
            res.redirect("/loginPage");
        })
    });

    //routes for tablet
    app.get("/tablet", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tablet.html"));
    });

    app.post("/haircutStartTime", function (req, res) {
        db.User.findAll({
            where: {
                userName: req.body.userName
            }
        }).then(function (data1) {
            // console.log(data1[0].dataValues.id);
            db.Appointment.findAll({
                where: {
                    UserId: data1[0].dataValues.id,
                    completed: false
                },
                order: [
                    ['date', 'ASC'],
                    ['start', 'ASC'],
                ]
            }).then(function (data2) {
                // console.log(data2);
                var apptId = data2[0].dataValues.id;
                db.Appointment.update({
                    serviceStart: req.body.startTime
                }, {
                        where: {
                            id: apptId
                        }
                    }).then(function (data3) {
                        // console.log(data3);
                        res.json(data3);
                    })
            })
        })

    });

    app.post("/haircutEndTime", function (req, res) {
        db.User.findAll({
            where: {
                userName: req.body.userName
            }
        }).then(function (data1) {
            // console.log(data1[0].dataValues.id);
            db.Appointment.findAll({
                where: {
                    UserId: data1[0].dataValues.id,
                    completed: false
                },
                order: [
                    ['date', 'ASC'],
                    ['start', 'ASC'],
                ]
            }).then(function (data2) {
                // console.log(data2);
                var apptId = data2[0].dataValues.id;

                var userStartTime = data2[0].dataValues.serviceStart;
                var userEndTime = parseInt(req.body.endTime);
                var totalTime = userEndTime - userStartTime;

                db.Appointment.update({
                    serviceEnd: userEndTime,
                    serviceLength: totalTime,
                    completed: true
                }, {
                        where: {
                            id: apptId
                        }
                    }).then(function () {
                        db.Appointment.findAll({
                            where: {
                                id: apptId
                            },
                            include: [{
                                model: db.Service
                            }]
                        }).then(function (data) {
                            // console.log(data[0].dataValues)
                            if (data[0].dataValues.Services.length === 1) {
                                // console.log(totalTime);
                                var current = data[0].dataValues.Services[0].dataValues.time;
                                var newTime = Math.ceil((totalTime + current) / 2);
                                // console.log(newTime);
                                db.Service.update({
                                    time: newTime
                                }, {
                                        where: {
                                            id: data[0].dataValues.Services[0].dataValues.id
                                        }
                                    }).then(function () {
                                        res.end();
                                    })
                            }
                            res.end();
                        })
                    });
            })
        })
    });
    app.get("/*", function (req, res) {
        res.redirect("/loginPage");
    });
}
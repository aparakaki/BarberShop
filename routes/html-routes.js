var path = require("path");
var db = require("../models");


module.exports = function (app) {
    app.get("/", function (req, res) {
        if (req.session.user) {
            console.log("1");
            console.log(req.session.user);
            res.redirect("/services");
        }
        else if (req.headers.cookie) {
            console.log("2");
            if (req.headers.cookie.match(/(?<=token=)[^ ;]*/) !== null) {
                var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
                db.User.findOne({
                    where: {
                        token: cookie
                    }
                }).then(function (token) {
                    if (token !== null) {
                        req.session.user = {
                            username: req.body.username,
                            password: req.body.password
                        }
                        return res.redirect("/services");
                    }
                    res.clearCookie("token");
                    res.redirect("/");
                });
            }
            else {
                res.sendFile(path.join(__dirname, "../index.html"));
            }
        }
        else {
            console.log("3");
            res.sendFile(path.join(__dirname, "../index.html"));
        }
    });

    app.get("/services", function (req, res) {
        if (req.session.user) {
            db.User.findOne({
                where: {
                    username: req.session.user.username,
                    password: req.session.user.password
                }
            }).then(function (user) {
                if (user !== null) {
                    console.log("services");
                    res.sendFile(path.join(__dirname, "../public/services.html"));
                }
                else {
                    res.clearCookie("token");
                    req.session.destroy();
                    res.redirect("/");
                }
            });
        }
        else {
            console.log("service2");
            res.clearCookie("token");
            req.session.destroy();
            res.redirect("/");
        }
    });

    app.get("/calendar", function (req, res) {
        db.User.findOne({
            where: {
                username: req.session.user.username,
                password: req.session.user.password
            }
        }).then(function (user) {
            if (user !== null) {
                res.sendFile(path.join(__dirname, "../public/calendar.html"));
            }
        });
    });

    app.get("/tablet", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/tablet.html"));
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
                console.log("here", req.body);
                var token = "t" + Math.random();
                db.User.update({
                    token: token,
                },
                    {
                        where: {
                            username: req.body.username
                        }
                    }).then(function (dbTodo) { });

                res.cookie("token", token, { expires: new Date(Date.now() + 999999999) });

                req.session.user = {
                    username: req.body.username,
                    password: req.body.password
                }
                return res.redirect("/");
            }
            res.redirect("/userNotFound");
        });
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
                password: req.body.password
            }
            res.redirect("/");
        })
    });

    app.post("/haircutStartTime", function (req, res) {
        console.log("hi");
        db.tabletTrackerTime.create({
            userName: req.body.userName,
            startTime: req.body.startTime
        }).then(function (user) {
            res.json(user);
        })
    });

    app.post("/haircutEndTime", function (req, res) {
        db.tabletTrackerTime.findOne({
            where: {
                userName: req.body.userName
            }
        }).then(function (data) {
            console.log(req.body.endTime);
            let userStartTime = data.dataValues.startTime;
            let userEndTime = parseInt(req.body.endTime);
            let totalTime = userEndTime - userStartTime
            db.tabletTrackerTime.update({
                totalTime: totalTime
            }, {
                    where: {
                        userName: req.body.userName
                    }
                }).then(function (user) {
                    res.json(user);

                })
        });
    })
}
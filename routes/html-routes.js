var path = require("path");
var db = require("../models");


module.exports = function (app) {
    app.get("/", function (req, res) {
        if (req.session.user) {
            console.log("1");
            var x = req.headers.cookie;
            var y = x.slice(((x.indexOf("="))+1), (x.indexOf(";")));
            console.log(y);
            res.redirect("/services");
        }
        // else if (req.headers.cookie) {
        //     console.log("2");
        //     console.log(req.headers.cookie);
        //     db.User.findOne({
        //         where: {
        //             token: req.headers.cookie
        //         }
        //     }).then(function (token) {
        //         if (token !== null) {
        //             req.session.user = user[i];
        //             res.redirect("/services");
        //         }
        //     });
        // }
        else {
            var x = req.headers.cookie;
            var y = x.slice(((x.indexOf("="))+1), (x.indexOf(";")));
            console.log(y);
            console.log('3');
            res.sendFile(path.join(__dirname, "../index.html"));
        }
    });

    app.get("/services", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/services.html"));
        // }
        // else {
            // res.redirect("/");
        // }
    });

    app.get("/calendar", function (req, res) {
        // if (req.session.user) {
            res.sendFile(path.join(__dirname, "../public/calendar.html"))
        // }
        // else {
            // res.redirect("/");
        // }
    });

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
                            username: req.body.username
                        }
                    }).then(function (dbTodo) { });

                    res.cookie("token", token, {expires: new Date(Date.now() + 90000000)});

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
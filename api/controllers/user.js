const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = (req, res, next) => {
    User.find({ email: req.body.email }) // provera da li postoji user sa tim mejlom
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                // jer ako ne postoji ne baca null nego prazan string
                return res.status(422).json({
                    message: "Mail exists", // ako postoji baca se greska
                });
            } else {
                // ako ne postoji nastavljas dalje i provera passworda
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created",
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err,
                                });
                            });
                    }
                }); // salting rounds je 10
            }
        });
}

const login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed!",
                });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed!",
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id,
                                token_type: "refresh"
                            },
                            "secret",
                            {
                                expiresIn: "1h",
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            token: token,
                        });
                    }
                    res.status(401).json({
                        message: "Auth failed!",
                    });
                }
            );
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
}

const deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "User deleted",
            });
        })
        .catch((err) =>
            res.status(500).json({
                error: err,
            })
        );
}

module.exports = {
    signup,
    login,
    deleteUser
}
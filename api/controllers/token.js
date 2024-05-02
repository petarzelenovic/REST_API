const jwt = require("jsonwebtoken");
const Token = require("../models/token");

const refreshToken = (req, res) => {
    const token = jwt.sign(
        {
            email: req.userData.email,
            userId: req.userData.userId,
            token_type: "access"
        },
        "secret",
        {
            expiresIn: "5m",
        }
    );
    return res.status(200).json({
        message: "Auth successful",
        token: token,
    });
}

const revokeToken = (req, res) => {
    const token = new Token({
        value: req.headers.authorization.split(" ")[1]
    });
    token.save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Token revoked",
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });

}

module.exports = {
    refreshToken,
    revokeToken
}
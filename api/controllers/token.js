const jwt = require("jsonwebtoken");

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

module.exports = {
    refreshToken
}
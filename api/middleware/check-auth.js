const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret"); // secret je key
        if(decoded.token_type !== "access"){
            return res.status(401).json({
                message: "Auth failed",
            });
        }
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Auth failed",
        });
    }
};

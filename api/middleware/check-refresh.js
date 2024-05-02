const jwt = require("jsonwebtoken");
const Token = require("../models/token");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret"); // secret je key
        if(decoded.token_type !== "refresh"){
            return res.status(401).json({
                message: "Auth failed",
            });
        }
        const foundToken = await Token.findOne({value: token}).exec();
            if(foundToken){
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
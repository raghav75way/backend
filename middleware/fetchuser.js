const jwt = require('jsonwebtoken');
const secretKey = "thisIsSecretkey";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send("Please authenticate using a valid token");
    }
    try {
        const data = jwt.verify(token, secretKey);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send("Please authenticate using a valid token");
    }
};

module.exports = fetchuser;

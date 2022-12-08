const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization ||req.headers.Authorization;
    // If we don't and if we do, have an authHeader check for Bearer capi by default
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    //console.log(authHeader); //Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //Invalid token (forbidden) - YOU SHALL NOT PASS
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
};

module.exports = verifyJWT;
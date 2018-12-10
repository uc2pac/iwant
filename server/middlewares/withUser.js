const JwtUtils = require('../utils/jwt');

module.exports = (req, res, next) => {
    const token = req.cookies['iw.s'];

    JwtUtils.validateJWT(token, (err, decoded) => {
        res.locals.user = decoded;
        return next();
    });
}
const JwtUtils = require('../utils/jwt');

module.exports = (req, res, next) => {
    const token = req.cookies['iw.s'];

    JwtUtils.validateJWT(token, (err, decoded) => {
        if (err || Date.now() - decoded.exp <= 0) { // session expired
            res
                .status(401)
                .clearCookie('iw.s')
                .send();
        } else {
            res.locals.user = decoded;
        }

        return next();
    });
}
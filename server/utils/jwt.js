const jwt = require('jsonwebtoken');

// TODO: currently we have "dummy_secret" in .env
// Use PrivateKey instead

const generateJWT = (user) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    return jwt.sign({
        id: user._id,
        username: user.email,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

const validateJWT = (token, cb) => {
    jwt.verify(token, process.env.JWT_SECRET, cb);
}

module.exports = {
    generateJWT,
    validateJWT
}
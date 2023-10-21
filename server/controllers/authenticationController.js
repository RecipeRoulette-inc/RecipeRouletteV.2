const jwt = require('jsonwebtoken');
const pool = require('../database/connectToDb');
// require('dotenv').config();

authenticationController = {};

authenticationController.createCookie = async (req, res, next) => {

    try {

        if (req.cookies.SSID) res.clearCookie('SSID')

        const user_id = res.locals.user_id;
        const jToken = jwt.sign({ user_id }, process.env.SECRET, { expiresIn: '1h' })
        res.cookie('SSID', jToken, { expires: new Date(Date.now() + 300000), httpOnly: true })

        return next()

    } catch (error) {
        return next({
            log: "Error occurred creating the cookie",
            status: 400,
            message: { error: "Error in createCookie controller" },
        });
    };
};

// not built out yet
authenticationController.verifyCookie = async (req, res, next) => {

    const jToken = req.cookies.SSID

    if (!jToken) {
        return res.status(403).json({ Status: 'Unauthorized: Token not provided' });
    }

    try {
        jwt.verify(jToken, process.env.SECRET)
        res.locals.verified = true
        return next()
    } catch (error) {
        res.locals.verified = false;
        return next();
    }
}

// not built out yet
authenticationController.clearCookie = async (req, res, next) => {
    try {
        // why can't we pull the cookie off?
        console.log('<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>')
        // console.log(req.cookies)
        // const { cookies } = req
        res.clearCookie("jwtToken");
        return next()
    } catch (error) {
        return next({
            log: "Error occurred clearing the cookie",
            status: 400,
            message: { error: "Error in clearCookie controller" },
        })
    }
}

module.exports = authenticationController;
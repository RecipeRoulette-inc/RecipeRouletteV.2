const jwt = require('jsonwebtoken');

authenticationController = {};

authenticationController.createCookie = async (req, res, next) => {
    try {
        if (req.cookies.SSID) res.clearCookie('SSID');
        const user_id = res.locals.user_id;
        const jToken = jwt.sign({ user_id }, process.env.SECRET, { expiresIn: '1h' });
        res.cookie('SSID', jToken, { expires: new Date(Date.now() + 600_000), httpOnly: true });
        return next();
    } catch (error) {
        return next({
            log: "Error occurred creating the cookie",
            status: 500,
            message: { error: "Error in authenticationController.createCookie controller" },
        });
    };
};

// not built out yet
authenticationController.verifyCookie = async (req, res, next) => {
    const jToken = req.cookies.SSID;

    if (!jToken) {
        return res.status(403).json({ Error: 'Unauthorized: Token not provided' });
    };

    try {
        jwt.verify(jToken, process.env.SECRET);
        res.locals.verified = true;
        return next();
    } catch (error) {
        res.locals.verified = false;
        return next();
    };
};

// not built out yet
authenticationController.clearCookie = async (req, res, next) => {
    try {
        if (res.locals.verified === true) {
            await res.clearCookie("SSID");
        };
        return next();
    } catch (error) {
        return next({
            log: "Error occurred in clearing the cookie",
            status: 500,
            message: { error: "Error in authenticationController.clearCookie controller" },
        });
    };
};

module.exports = authenticationController;
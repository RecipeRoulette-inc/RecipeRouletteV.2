const jwt = require('jsonwebtoken')

authenticationController = {};

authenticationController.createCookie = async (req, res, next) => {
    try {
        console.log(res.locals);
        // desctructure id off incoming user from res locals
        const { _id } = res.locals.user._id
        console.log('---UserID', _id);
        //jwt.sign - creates JWT token 
        let jwtToken = jwt.sign({id: _id}, process.env.KEY)
        // check cookie params with cors once front and backend connect
        res.cookie("jwtToken", jwtToken, {httpOnly: true, secure: true})
        return next()
    } catch (error) {
        return next({
            log: "Error occurred creating the cookie",
            status: 400,
            message: { error: "Error in createCookie controller" },
        })
    }
}

// not built out yet
authenticationController.verifyCookie = async (req, res, next) => {
    try {
        const { cookies } = req.body
        //jwt.verify

    } catch (error) {
        return next({
            log: "Error occurred verifying the cookie",
            status: 400,
            message: { error: "Error in verifyCookie controller" },
        })
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
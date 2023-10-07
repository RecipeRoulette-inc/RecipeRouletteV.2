const jwt = require('jsonwebtoken')

authenticationController = {};

authenticationController.createCookie = async (req, res, next) => {
    try {
        // desctructure id off incoming user from res locals
        const { user_id } = res.locals.user._id
        //jwt.sign
        let token = jwt.sign({id: user_id}, process.env.KEY)
        res.cookie("jwtToken", token)


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

    } catch (error) {
        return next({
            log: "Error occurred clearing the cookie",
            status: 400,
            message: { error: "Error in clearCookie controller" },
        })
    }
}
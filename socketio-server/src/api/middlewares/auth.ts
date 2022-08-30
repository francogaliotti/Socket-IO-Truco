
const authConfig = require('../../config/auth')

module.exports = (req, res, next) => {
    let token = req.header("accessToken")
    if (!token) {
        res.status(400).json({
            error: "Not authorized"
        })
    } else {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                res.status(500).json({
                    error: "Internal server error"
                })
            } else {
                req.user = decoded.user
                next()
            }
        })
    }


}
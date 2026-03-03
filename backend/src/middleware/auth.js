const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {

        const bearerHeader = req.headers['authorization']
        
        
        if (typeof bearerHeader != 'undefined') {
            
            const token = bearerHeader.split(' ')[1]
            // console.log(bearerHeader);
            const user = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(user)
            req.token = user

            next()


        }
        else {
            res.status(401).json({ msg: 'No Token Provided' })
        }


    } catch (error) {
        return res.status(403).json({ msg: 'Invalid or expired token ' });
    }
}
module.exports = auth
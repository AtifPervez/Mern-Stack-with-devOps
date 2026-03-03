const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')
// dotenv.config()


const postRegister = async (req, res) => {
    try {

        const data = req.body
        const { username, email, password } = data
        const existUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existUser) return res.status(400).json({ message: 'user already exist' })

        let hasedPassword = await bcrypt.hash(password, 10)

        let user = new User({ username, email, password: hasedPassword })
        let savedUser = await user.save()
        res.json({ savedUser })



    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message, err: error.stack });
    }
}
const login = async (req, res) => {
    try {

        let data = req.body
        let { username, password } = data
        let user = await User.findOne({ username })

        if (!user) return res.status(400).json({ message: 'user not found' })

        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'invalid credentials' })


        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,

            {
                expiresIn: '1m'
            }
        )
        res.status(200).json({ msg: "Token Generate Successfully", token: token })






    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message, err: error.stack });
    }
}


const getUser = async (req, res) => {
    try {
        const { id } = req.params;  

        let user = await User.findById(id);   
        let count = await User.countDocuments();


        res.status(200).json({ totalData: count, data: user })

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message, err: error.stack });
    }
}




module.exports = { postRegister, login, getUser }
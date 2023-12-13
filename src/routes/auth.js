const { Router } = require('express');
const {
    hashPassword,
    comparePassword
} = require('../utils/helper/bcrypt');
const User = require('../database/schemas/User')

const router = Router();

router.post('/login', (req, res) => {
    const { userName, password } = req.body;
    if(userName && password){
        if(req.session.user) res.status(200).send(req.session.user)
        else{
            req.session.user = userName;
            res.status(200).send(req.session.user)
        }
    }else res.send(401)
})

router.post('/register', async (req, res) => {
    const { userName, password, email } = req.body;
    if(userName && password && email){
        const existUser = await User.findOne({ $or: [{ userName }, { email }] })
        if(existUser) res.status(400).send({ message:"user or email has been exists!" })
        else{
            const _password = typeof password === "string" ? password : password.toString()
            const _hashPassword = hashPassword(_password)
            
            const newUser = await User.create({ userName, password: _hashPassword, email })
            await newUser.save()
            await res.status(200).send({ data: { userName, email }, message: "register success!"})
        }
    }else res.status(404).send("LACK_OF_REQUIRED_DATA")
})

module.exports = router;
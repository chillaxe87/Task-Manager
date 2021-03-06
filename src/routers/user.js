const express = require('express')
const User = require('../modals/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendTerminateEmail } = require ('../emails/account')

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(err) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch (err) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch (err) {
        res.status(500).send()
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        const token = await user.generateAuthToken()
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({user, token})
    } catch (err){
        res.status(400).send({
            error: "unable to connect to server",
            err
        })
    }
})

router.patch('/users/me', auth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password' , 'age']
    const isValidUpdate = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidUpdate){
        return res.status(400).send({
            error: "Invalid Updates"
        })
    }

    try{
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    }catch(err) {
        res.status(500).send(err)
    }
})

router.delete('/users/me', auth, async (req, res) =>{
    try{
        await req.user.remove()
        sendTerminateEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(err){
        res.status(500).send(err)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000 //in bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload an image"))
        }
        cb(undefined, true)
        // cb(new Error('File must be a PDF'))   deny and tell
        // cb(undefined, true)                   accept
        // cb(undefined, false)                  deny without telling
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({width:300, height: 400}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
           throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    }catch(err) {
        res.status(404).send()
    }
})
module.exports = router
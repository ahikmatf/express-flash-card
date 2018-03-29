const express = require('express')
const router = express.Router()

// rute pertama
router.get('/', (req, res, next) => {
    if (!req.cookies.username) {
        res.redirect('/hello')
        // let bikinError = new Error("ga ada username")
        // next(bikinError)
    }
    res.locals.username = req.cookies.username
    res.render("index")
})

router.get('/hello', (req, res) => {
    if (req.cookies.username) {
        res.redirect('/')
    }
    res.render("hello")
})

router.post('/hello', (req, res) => {
    res.cookie("username", req.body.username)
    res.redirect('/')
})

router.get('/goodbye', (req, res) => {
    res.clearCookie('username')
    res.redirect('/hello')
})

module.exports = router
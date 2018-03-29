const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mainRoutes = require('./routes/index.js')
const cardRoutes = require('./routes/cards.js')

const port = 14042

app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

// expose static files
app.use('/public', express.static('public'))

// masang mesin template, pug
app.set('view engine', 'pug')

// rute rutenya
app.use(mainRoutes)
app.use('/cards', cardRoutes)

// bikin error, kalau ga ada rute yang cocok
app.use((req, res, next) => {
    let errornya = new Error("GA ADA BRE")
    errornya.status = 404
    next(errornya)
})

// error middleware
app.use((err, req, res, next) => {
    res.locals.status = err.status
    res.locals.errorMessage = err.message
    res.render('error')
})

app.listen(port, () => {
    console.log("dah nyala")
})
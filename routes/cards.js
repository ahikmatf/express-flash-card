const express = require('express')
const router = express.Router()

// const data = require('../data/flashCardData.json').data
const { data } = require('../data/flashCardData.json')
// const cards = data.cards
const { cards } = data

// kalau ada yang buka /cards dia bakal dikasih ke suatu id card secara random
router.get('/', (req, res) => {
    let totalCards = cards.length
    let randomId = Math.floor(Math.random() * totalCards)

    res.redirect(`/cards/${randomId}?side=soal`)
})

router.get('/:id', (req, res) => {
    // res.locals.variabel = "Aku adalah siapa?"
    // res.locals.hint = "Kamu pernah ketemu"

    const { id } = req.params
    const { side } = req.query

    console.log(typeof side)

    const text = cards[id][side]
    const { hint } = cards[id]
    let templateData = { id, text, hint } // ini shorthand properties

    if (side == "jawaban") {
        templateData = { id, text } // ini shorthand properties
        templateData.sidenya = "soal"
        templateData.SideToDisplay = "Lihat Soal"
    } else if (side == "soal") {
        templateData.sidenya = "jawaban"
        templateData.SideToDisplay = "Lihat Jawaban"
    } else if (!side) {
        res.redirect(`/cards/${id}?side=soal`)
    }

    res.locals = templateData 
    res.render("cards"/*,{variabel: "Aku siapa?"}*/) //locals
})

module.exports = router
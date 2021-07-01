const router = require('express').Router()
const artistController = require('../controller/artist.controller')
const check  = require('express-validator').check
const bodyParser = require('body-parser')


router.get('/:id',artistController.getArtist)

router.get('/update/:id',artistController.getUpdateArtist)

router.post('/delete/:id',artistController.deleteArtist)

router.post('/update/:id', bodyParser.urlencoded({extended:true}),artistController.updateArtist)

module.exports = router
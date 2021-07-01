const router = require('express').Router()
const exhibitionController = require('../controller/exhibition.controller')
const bodyParser = require('body-parser')


router.get('/update/:id',exhibitionController.getUpdateExhibition)
router.post('/update/:id', bodyParser.urlencoded({extended:true}),exhibitionController.updateExhibition)


module.exports = router
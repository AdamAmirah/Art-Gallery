const router = require('express').Router()
const customerController = require('../controller/customer.controller')
const bodyParser = require('body-parser')


router.get('/:id',customerController.getOrderList)

router.get('/addOrder/:id',customerController.getAddOrder)

router.post('/addOrder/:id', bodyParser.urlencoded({extended:true}), customerController.addOrder) 


module.exports = router
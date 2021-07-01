const customerModel = require('../models/customerModel.model')

const ordersModel = require('../models/ordersModel.model')

exports.getOrderList = (req, res, next) =>{
    result = ordersModel.getOrders(req.params.id)
    result.then((orders)=>{
        res.render('order-list', {
            id: req.params.id,
            orders: orders
        })
    }).catch( err => {
        next(err)
    })

}

exports.getAddOrder = (req, res, next) =>{
        let result = customerModel.getCustomerName(req.params.id)
        result.then((name)=>{
            res.render('add-order', {
                IDError: req.flash('IDError')[0],
                id: req.params.id,
                name: name[0].customer_name
            })
        }).catch( err => {
            next(err)
        })


}

exports.addOrder = (req, res, next) =>{
    ordersModel.addOrder({
        OrderID: req.body.orderId,
        ArtID: req.body.artID,
        Order_Date : req.body.Order_Date,
        CustomerID: req.params.id
    }).then((results)=>{
        res.redirect(`/customer/${req.params.id}`)
    }).catch( err => {
        console.log(err.message);
        req.flash('IDError' , err.message)
        res.redirect(`/customer/addOrder/${req.params.id}`)
    })
}


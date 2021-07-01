const artworkModel = require('../models/artworkModel.model')
const artistModel = require('../models/artistModel.model')
const exhibModel = require('../models/exhibModel.model')
const customerModel = require('../models/customerModel.model')



exports.getHome = (req, res, next) =>{
        let art = artworkModel.getArtwork()
        art.then( (arts) =>{
                //console.log(arts);
                let artist =  artistModel.getArtists()
                artist.then((artists)=>{
                        let exhib = exhibModel.getExhib()
                        exhib.then((exhibitions)=>{
                                let customer =  customerModel.getCustomers()
                                customer.then( (customers)=>{
                                        res.render('index', {
                                                artwork : arts,
                                                artists: artists,
                                                exhibitions: exhibitions,
                                                customers: customers
                                        })
                                }).catch( err => {
                                        next(err)
                                    })
                                
                        }).catch( err => {
                                next(err)
                            })
                }).catch( err => {
                        next(err)
                    })

        }).catch( err => {
                next(err)
            })
}
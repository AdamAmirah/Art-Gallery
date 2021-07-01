const exhibModel = require('../models/exhibModel.model')

exports.getUpdateExhibition = (req, res, next) =>{
    res.render('update-exhibition', {
        id: req.params.id
    })

}

exports.updateExhibition = (req, res, next) =>{
    if(req.body.exname == '')req.body.exname = null
    if(req.body.eDate == '')req.body.eDate = null
    if(req.body.sDate == '')req.body.sDate = null

    exhibModel.updateExhibition({
        ExhibitionID: req.params.id,
        E_Name: req.body.exname,
        Start_Date : req.body.sDate,
        End_Date : req.body.eDate

    }).then((results)=>{
    res.redirect('/')
})
.catch( err => {
    next(err)
})

}

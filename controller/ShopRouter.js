const express = require('express')
const ShopModel = require('../model/ShopModel')
const router = express.Router()

router.get('/entry',function(req,res)
{
    console.log('entry page open')
    res.render('entry')
})

router.post('/save',(req,res)=>
{
    console.log(res.body)
    ShopModel.saveSales(req.body,(status)=>
    {
        if(status)
        res.send('<h2>Record Save</h2>')

        else
        res.send('<h2>Record Failed</h2>')
    })
})

router.get('/show',(req,res)=>
{
    ShopModel.showSales((records)=>
    {
        console.log('show router called')

        if(records)
            res.render('show',{salesz:records})
        else
            res.render('show',{salesz:[]})
    })
})

router.get('/delete',(req,res)=>
{
    id=req.query._id
    ShopModel.deleteSales(id,(status)=>
    {
        console.log('delete called')
        res.redirect('/shop/show')
    })
})

router.get('/update_req',(req,res)=>
{

    res.render('update',{id:req.query._id,name:req.query.sname,dep:req.query.dept,sal:req.query.salary})
})

router.post('/update',(req,res)=>
{
    id = req.body._id;
    name = req.body.sname;
    dep = req.body.dept;
    sal = req.body.salary;
    console.log("UPDATE : ",id,"  ",name,"  ",dep,"  ",sal);

    ShopModel.updateSales(req.body,(status)=>
    {
        if(status){
        console.log("Value Updated")
        res.redirect('/shop/show')
    }
    else{
        console.log("Value Not Updated")
    }
    })
})

module.exports = router
const mongo = require('./db')

function sales()
{
    this.saveSales = function(data,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('shop')
                db.collection('sales').insertOne(data,function(err,res)
                {
                    if(err)
                    {
                        console.log('data insertion failed : ',err)
                        callback(false)
                    }
                    else
                    {
                        callback(res)
                    }
                })
            }
            else
            {
                console.log('Server Connection Failed : ')
                callback(false)
            }
        })
    }

    this.showSales = function(callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('shop')
                db.collection('sales').find().toArray(function(err,res)
                {
                    if(err)
                    {
                        console.log('query err ',err)
                        callback(false)
                    }
                    else
                    {
                        callback(res)
                    }
                })
            }
            else
            {
                console.log('server connection error ')
                        callback(false)
            }
        })
    }

    this.deleteSales = function(id,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('shop')
                db.collection('sales').deleteOne({_id:id},(err,res)=>
                {
                    if(err)
                    {
                        console.log('Query err ',err)
                        callback(false)
                    }
                    else
                    {
                        callback(res)
                    }
                })
            }
            else
            {
                console.log('server connection error')
                callback(false)
            }
        })
    }


    this.updateSales = function(data,callback)
    {
        mongo((server)=>
        {
            if(server)
            {
                var db = server.db('shop')

                db.collection('sales').updateOne({_id:data._id}, {$set:{sname:data.sname, dept:data.dept, salary:data.salary}},(err,res)=>
                {
                    if(err)
                    {
                        console.log('update query error')
                        callback(false)
                    }
                    else
                    {
                        callback(res)
                    }
                })
            }
            else
            {
                console.log('server connection error')
                callback(false)
            }
        })
    }
}


module.exports = new sales
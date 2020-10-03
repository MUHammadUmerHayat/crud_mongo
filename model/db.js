var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/"

function getConnection(callback)
{
    MongoClient.connect(url,function(err,db)
    {
        if(err)
        {
            callback(false)
        }
        else
        {
            callback(db)
        }
    })
}

module.exports = getConnection
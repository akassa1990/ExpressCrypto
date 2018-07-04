const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
var bodyParser = require('body-parser');

var dbo;
var url = 'mongodb://localhost:27017/';

var app = express();
var port = 5000;

MongoClient.connect(url ,{ useNewUrlParser: true },(err,db)=>{
    if(err) throw err;
    dbo = db.db('library');
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

var router = express.Router(); 

router.route('/secret')
                    .get((req,resp)=>{
                        var message = dbo.collection('homework7').findOne({},(err,result)=>{
                            if(err) throw err;
                            var msg = result.message;
                            var mykey = crypto.createDecipher('aes256', 'asaadsaad');
                            var mystr = mykey.update(msg, 'hex', 'utf8');
                                mystr += mykey.final('utf8');
                            resp.end(mystr);                              
                        })
                    });

app.use('/api', router);
app.listen(port);
console.log('Server running on PORT: ' + port);


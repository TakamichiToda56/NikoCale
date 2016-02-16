var mongoose = require ('mongoose');
var  Schema = mongoose.Schema;

var url = 'mongodb://localhost/nikocale';

var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

var UserDataSchema = new mongoose.Schema({
  'name' : String,
  'pass' : String,
  'tweet' : [{'date' : String, 'feeling' : String, 'word' : String}]
})

exports.UserData = db.model('UserInfomation', UserDataSchema);

var mongoose = require ('mongoose');
var  Schema = mongoose.Schema;

var url = 'mongodb://localhost:27006/nikocale';

var db  = mongoose.createConnection(url, function(err, res){
    if(err){
        console.log('Error connected: ' + url + ' - ' + err);
    }else{
        console.log('Success connected: ' + url);
    }
});

var UserDataSchema = new mongoose.Schema({
  'id' : String,
  'pass' : String,
  'name' : String,
  'tweet' : [{'date' : String, 'feeling' : String, 'word' : String, 'like' : [String]}]
})

exports.UserData = db.model('UserInfomation', UserDataSchema);

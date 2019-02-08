const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
username: {type:String, unique:true},
password: {type:String, unique:true},
city: {type:String, unique:true},
})


const User = mongoose.model('User', userSchema);

module.exports = User;

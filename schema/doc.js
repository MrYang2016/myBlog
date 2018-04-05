const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = mongoose.model('doc',new Schema({
    time:String,
    originalname:String,
    filename:String,
    intro:String
}));
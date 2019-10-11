const mongoose = require('mongoose');

const CSATSchema = new mongoose.Schema({
    voca : { type:String, required:true, unique:true },
    meaning : { type:String, required:true },
});

module.exports = mongoose.model('CSAT', CSATSSchema);


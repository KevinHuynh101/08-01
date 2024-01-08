var mongoose = require("mongoose");
const configs = require('../helper/configs')

const schema = new mongoose.Schema({
    name: String,
    isdelete: Boolean,
    order: Number,
    product_k:[{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    }]
});


module.exports = mongoose.model('category', schema);
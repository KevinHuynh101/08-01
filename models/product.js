var SchemaProduct = require('../schema/product')
module.exports ={
    getall: function (query) {
        var sort = {};
        var search = {
            isdelete: false
        };

        if (query.sort) {
            if (query.sort[0] === '-') {
                sort[query.sort.substring(1)] = 'desc';
            } else {
                sort[query.sort] = 'asc';
            }
        }

        var limit = parseInt(query.limit) || 10;
        var page = parseInt(query.page) || 1;
        var skip = (page - 1) * limit;

        return SchemaProduct.find(search)
            .populate({
                path: 'category_k',
                match: { isdelete: false }, 
                options: { sort: { order: 1 } } 
            })
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .exec();
    },
    createProduct: function (product) {
        return new SchemaProduct(product).save();
    },
    getByName: function (name) {
        return SchemaProduct.findOne({ name: name }).exec();
    },
}
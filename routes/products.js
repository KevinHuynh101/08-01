var express = require('express');
var router = express.Router();
var ProductDepartment = require('../schema/product');
var modelProduct = require('../models/product')
var responseData = require('../helper/responseData');

router.get('/', async function (req, res, next) {
  var ProductAll = await modelProduct.getall(req.query);
  responseData.responseReturn(res, 200, true, ProductAll);
});

router.post('/add',async function (req, res, next) {
    var product = await modelProduct.getByName(req.body.name);
    if (product) {
      responseData.responseReturn(res, 404, false, "product da ton tai");
    } else {
     
      const newProduct = await modelProduct.createProduct({
        name: req.body.name,
        price: req.body.price,
        isdelete: req.body.isdelete,
        order: req.body.order,
        category_k:req.body.category_k
      })
      responseData.responseReturn(res, 200, true, newProduct);
    }
  });
  

router.put('/edit/:id', async function (req, res, next) {
  try {
      var updatedProduct = await modelProduct.findByIdAndUpdate(req.params.id, { isdelete: true }, { returnDocument: 'after' });
      if (!updatedProduct) {
          return responseData.responseReturn(res, 405, false, null, 'Product not found');
      }
      responseData.responseReturn(res, 200, true, updatedProduct);
  } catch (error) {
      responseData.responseReturn(res, 500, false, null, "false");
  }
});





module.exports = router;
const  { Schema, model } = require('mongoose');

const productSchema = new Schema({
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  productDescription: { type: String, required: true },
  /*category: { type: String, required: true },
  shade: { type: String, required: true }, */
  productImage: { type: String } // Make productImage optional
});



productSchema.pre('save', function(next){
    this.updatedOn = new Date();
    this.createdOn = new Date();

    //to save use next
    next();
});

productSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next){
    const update = this.getUpdate();
    delete this._id;
    this.updatedOn = new Date();

    next();
});

const ProductModel = model ('Product', productSchema);

module.exports = ProductModel;
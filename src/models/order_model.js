const { Schema, model } = require('mongoose');

const orderItemSchema = new Schema({
    products: { type: Map, required: true },
    quantity: { type: Number, default: 1 }
});

const orderSchema = new Schema({
    user: { type: String, required: true },  
    email: { type: String, required: true }, // Add email field
    phoneNumber: { type: String, required: true }, // Add phoneNumber field
    address: { type: String, required: true }, // Add address field
    city: { type: String, required: true }, // Add city field
    items: { type: [orderItemSchema], default: [] },
    status: { type: String, default: "order-placed" },
    updatedOn: { type: Date }, 
    createdOn: { type: Date }
});

orderSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

orderSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
});

const OrderModel = model('Order', orderSchema);

module.exports = OrderModel;

const  { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');


const sellerSchema = new Schema({
    id: { type: String, default: "" },
    fullName: { type: String, default: "" },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    phoneNumber: { type: String, default: ""},
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type:String, default: ""},
    profileProgress: { type: Number, default: 0}, // 0 -> user only cretaed account, 1 -> user has entered address 
    updatedOn: { type: Date },
    createdOn: { type: Date },
});

sellerSchema.pre('save', function(next){
    this.id = new uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    const salt = bcrypt.genSaltSync(10);
    // new password is hash
    //const hash = bcrypt.hashSync(this.password,salt);

    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;


    //to save use next
    next();
});

sellerSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next){
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.updatedOn = new Date();

    next();
});

const seller_model = model('Seller', sellerSchema);

module.exports = seller_model;

const  { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userSchema = new Schema({
    id: { type: String, default: "" },
    fullName: { type: String, default: "" },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    phoneNumber: { type: String, default: ""},
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type:String, default: ""},
    profilePicture: { public_id: { type: String }, url: { type: String, }, }, // Store URL or data of profile picture
    profileProgress: { type: Number, default: 0},
    updatedOn: { type: Date },
    createdOn: { type: Date },
});


userSchema.pre('save', function(next){
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

userSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next){
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.updatedOn = new Date();

    next();
});

const user_model = model('User', userSchema);

module.exports = user_model;



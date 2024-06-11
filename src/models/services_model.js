const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String },
    serviceStyles: { type: String },
    serviceImage: { type: String},
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;


const ServiceModel = require('../models/services_model');

const ServiceController = {

  createAccount: async function(req,res) {
    try {
        const serviceData = req.body;
        const newService = new ServiceModel(serviceData);
        await newService.save();

        return res.json({ success: true, data: newService, message: 'account created!' });

    } catch (error) {
        console.error(error); 
        return res.json({ success: false, message: error.message || 'An error occurred' });
    }
    },

    signIn: async function(req,res) {
        try{
            const { email, password } = req.body;

            const foundProvider = await ServiceModel.findOne({ email: email });
            if(!foundProvider) {
                return res.json({ success: false, message: 'service provider not found!' });
            }

            const passwordMatch = bcrypt.compareSync(password, foundService.password);
            if(!passwordMatch) {
                return res.json({ success: false, message: 'service provider not found!' });
            }

            return res.json({ success: true, data:foundProvider });

        } catch(error) {
            return res.json({ success: false, message: error.message || 'An error occurred' });
        }
    },

  addService : async (req, res) => {
    const { serviceName, serviceStyles, serviceImage } = req.body;
    
    if (!serviceName || !serviceStyles || !serviceImage) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {
        const newService = new ServiceModel({
            serviceName,
            serviceStyles,
            serviceImage,
        });

        const savedService = await newService.save();
        res.json({ success: true, data: savedService });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
},

fetchServices : async (req, res) => {
  try {
      const services = await ServiceModel.find();
      res.json({ success: true, data: services });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
},

}

module.exports = ServiceController
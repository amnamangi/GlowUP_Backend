const UserModel = require('../models/user_model');
const CategoryModel = require('./../models/category_models');
const ProductModel = require("./../models/product_models");
const bcrypt = require('bcrypt');

const AdminController = {

    fetchAllUsers: async function(req, res) {
        try {
            const users = await UserModel.find();
            return res.json({ success: true, data: users });

        }catch(error) {
            return res.json({ success: false, message: error });
        }
    },

    fetchUserById: async function(req, res) {
        try {
            const id = req.params.id;
            const foundUser = await UserModel.findById(id);

            if(!foundUser) {
                return res.json({ success: false, message: 'user not found.'  });
            }
                return res.json({ success: true, data: foundUser  });

        }catch(error) {
            return res.json({ success: false, message: error });
        }
    },

    deleteUserById: async function(req, res) {
        try {
            const id = req.params.id;
            const deletedUser = await UserModel.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.json({ success: false, message: 'user not found.' });
            }

            return res.json({ success: true, data: deletedUser, message: 'user deleted!' });

        } catch(error) {
            return res.json({ success: false, message: error });
        }
    },

 /*   createCategory: async function(req, res) {
        try {
            const categoryData = req.body;
            const newCategory = new CategoryModel(categoryData);
            await newCategory.save();

            return res.json({ success: true, data: newCategory, message: 'category created!' });

        }catch(error) {
            return res.json({ success: false, message: error });
        }
    },

    fetchAllCategories: async function(req, res) {
        try {
            const categories = await CategoryModel.find();
            return res.json({ success: true, data: categories  });

        }catch(error) {
            return res.json({ success: false, message: error });
        }
    },

    fetchCategoryById: async function(req, res) {
        try {
            const id = req.params.id;
            const foundCategory = await CategoryModel.findById(id);

            if(!foundCategory) {
                return res.json({ success: false, message: 'category not found.'  });
            }
                return res.json({ success: true, data: foundCategory  });

        }catch(error) {
            return res.json({ success: false, message: error });
        }
    },

    deleteCategoryById: async function(req, res) {
        try {
            const id = req.params.id;
            const deletedCategory = await CategoryModel.findByIdAndDelete(id);

            if (!deletedCategory) {
                return res.json({ success: false, message: 'category not found.' });
            }

            return res.json({ success: true, data: deletedCategory, message: 'category deleted!' });

        } catch(error) {
            return res.json({ success: false, message: error });
        }
    },

    fetchAllProducts: async function(req, res) {
        try {
            const products = await ProductModel.find();
            return res.json({ success: true, data: products });
            
        } catch(error) {
           res.json({ success: false, message: error });
        }
    },

    fetchProductsByCategory: async function(req, res) {
        try {
            const categoryId = req.params.id;
            const products = await ProductModel.find({ category: categoryId });
            return res.json({ success: true, data: products });
            
        } catch(error) {
           res.json({ success: false, message: error });
        }
    },

    deleteProductFromCategory: async function(req, res) {
        try {
            const productId = req.params.productId;
            const categoryId = req.params.categoryId;
    
            // First, check if the product exists in the specified category
            const product = await ProductModel.findOne({ _id: productId, category: categoryId });
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found in the specified category." });
            }
    
            // If the product exists in the category, remove it
            await ProductModel.deleteOne({ _id: productId, category: categoryId });
    
            return res.json({ success: true, message: "Product deleted from the category successfully." });
        } catch(error) {
           res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    }, */

};

module.exports = AdminController
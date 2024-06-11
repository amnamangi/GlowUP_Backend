const SellerModel = require('../models/seller_model');
const CategoryModel = require('./../models/category_models');
const ProductModel = require("./../models/product_models");
const OrderModel = require('./../models/order_model');

const cloudinary = require('cloudinary').v2;

const bcrypt = require('bcrypt');
const { fetchAllCategories } = require('../user interface/user_controller');
const upload = require('../multer upload/multerConfig');

const SellerController = {

    createAccount: async function(req,res) {
        try {
            const sellerData = req.body;
            const newSeller = new SellerModel(sellerData);
            await newSeller.save();

            return res.json({ success: true, data: newSeller, message: 'account created!' });

        } catch (error) {
            console.error(error); 
            return res.json({ success: false, message: error.message || 'An error occurred' });
        }
        },

        signIn: async function(req,res) {
            try{
                const { email, password } = req.body;

                const foundSeller = await SellerModel.findOne({ email: email });
                if(!foundSeller) {
                    return res.json({ success: false, message: 'seller not found!' });
                }

                const passwordMatch = bcrypt.compareSync(password, foundSeller.password);
                if(!passwordMatch) {
                    return res.json({ success: false, message: 'seller not found!' });
                }

                return res.json({ success: true, data:foundSeller });

            } catch(error) {
                return res.json({ success: false, message: error.message || 'An error occurred' });
            }
        },

        updateAccount: async function (req, res) {
            try {
              const updates = req.body;
          
              // Find the user to update using _id from request params
              const seller = await SellerModel.findByIdAndUpdate(req.params._id, updates, { new: true });
              if (!seller) {
                return res.status(404).json({ success: false, message: 'seller not found' });
              }
          
              if (updates.address || updates.city || updates.state) {
                seller.profileProgress = 1; 
                await seller.save(); 
              }
          
              return res.json({ success: true, data: seller, message: 'Profile updated successfully!' });
            } catch (error) {
              console.error(error);
              return res.status(500).json({ success: false, message: error.message || 'An error occurred' });
            }
          },

        /*  createCategory : async function(req, res) {
            try {
                const categoryData = req.body;
                const newCategory = new Category(categoryData);
                await newCategory.save();
                return res.json({ success: true, data: newCategory, message: 'Category created successfully' });
            } catch (error) {
                console.error(error);
                return res.json({ success: false, message: error.message || 'An error occurred while creating the category' });
            }
        }, */

        /* fetchAllCategories : async function(req, res) {
            try {
                const categories = await CategoryModel.find();
                return res.json({ success: true, data: categories });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: 'An error occurred while fetching categories' });
            }
        }, */

        /*  fetchAllCategories: async function(req, res) {
            try {
                const categories = await CategoryModel.find();
                return res.json({ success: true, data: categories  });
    
            }catch(error) {
                return res.json({ success: false, message: error });
            }
        }, */
    
      /*  fetchCategoryById: async function(req, res) {
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

        createProduct: async function(req, res) {
            try {
                const productData = req.body;
                const newProduct = new ProductModel(productData);
                await newProduct.save();
        
                return res.json({ success: true, data: newProduct, message: 'Product created!' });
        
            } catch (error) {
                console.error(error); 
                return res.json({ success: false, message: error.message || 'An error occurred' });
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
        }, */


        createProduct: async (req, res) => {
            try {
              // Extract product details from request body
              const { productName, productId, productDescription } = req.body;
          
              // Check if a file was uploaded
              let productImage = null;
              if (req.file) {
                productImage = req.file.path;
              }
          
              // Create new product object
              const newProduct = new ProductModel({
                productName,
                productId,
                productDescription,
                productImage,
              });
          
              // Save the product to the database
              await newProduct.save();
          
              // Respond with success message and created product data
              res.status(201).json({ message: 'Product added successfully', product: newProduct });
            } catch (error) {
              // Handle errors
              res.status(500).json({ error: error.message });
            }
          },
          

          // Function to get all products
           getAllProducts : async (req, res) => {
            try {
              const products = await ProductModel.find();
              res.status(200).json(products);
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
          },
    
     /*   deleteProductFromCategory: async function(req, res) {
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
    
        updateProductInCategory : async function(req, res) {
            try {
                const productId = req.params.productId;
                const categoryId = req.params.categoryId;
                const updateData = req.body; // This should contain the updated fields for the product
    
            // Update the product within the specified category
            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: productId, category: categoryId },
                updateData,
                { new: true } // Return the updated document
            );
    
            if (!updatedProduct) {
                return res.status(404).json({ success: false, message: "Product not found in the specified category." });
            }
    
            return res.json({ success: true, data: updatedProduct, message: "Product updated successfully." });
        } catch(error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
    },

       updateOrderStatus: async function(req,res) {
        try{
           const { orderId, status } = req.body;
           const updateOrder = await OrderModel.findOneAndUpdate(
               { _id: orderId },
               { status: status },
               { new: true }
            );
           return res.json({ success: true, data: updateOrder });
            
        } catch(err) {
            return res.json({ success: false, message: err });
        }
    },

       fetchOrdersForSeller : async function(req, res) {
        try {
        const sellerId = req.params.sellerId;
        
        // Find orders where any item within the order has the specified seller ID
        const foundOrders = await OrderModel.find({ 
            "items": { 
                $elemMatch: { 
                    "seller._id": sellerId 
                } 
            } 
        });
        
        return res.json({ success: true, data: foundOrders });
        
       } catch(error) {
           return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
     }
  }      
};

module.exports = SellerController


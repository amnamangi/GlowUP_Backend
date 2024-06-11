const UserModel = require('../models/user_model');
const CategoryModel = require('./../models/category_models');
const ProductModel = require("./../models/product_models");
const CartModel = require('./../models/cart_model');
const OrderModel = require('./../models/order_model');
const AppointmentModel = require('../models/appointment_model');

const bcrypt = require('bcrypt');

const UserController = {

        updateAccount: async function (req, res) {
            try {
              const updates = req.body;
          
              // Find the user to update using _id from request params
              const user = await UserModel.findByIdAndUpdate(req.params._id, updates, { new: true });
              if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
              }
          
              if (updates.address || updates.city || updates.state) {
                user.profileProgress = 1; 
                await user.save(); 
              }
          
              return res.json({ success: true, data: user, message: 'Profile updated successfully!' });
            } catch (error) {
              console.error(error);
              return res.status(500).json({ success: false, message: error.message || 'An error occurred' });
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

        
        getCartForUser: async function(req, res) {
            try {
                const user = req.params.user;
                const foundCart = await CartModel.findOne({ user: user }).populate("items.product");
    
                if(!foundCart) {
                    return res.json({ success: true, data: [] });
                }
    
                return res.json({ success: true, data: foundCart.items });
            }
            catch(ex) {
                return res.json({ success: false, message: ex });
            }
        },

        addToCart: async function(req, res) {
           try {
            const { product, user, quantity } = req.body;
            const foundCart = await CartModel.findOne({ user: user });

            // If cart does not exist
            if(!foundCart) {
                const newCart = new CartModel({ user: user });
                newCart.items.push({
                    product: product,
                    quantity: quantity
                });

                await newCart.save();
                return res.json({ success: true, data: newCart, message: "Product added to cart" });
            }

            // Deleting the item if it already exists
            const deletedItem = await CartModel.findOneAndUpdate(
                { user: user, "items.product": product },
                { $pull: { items: { product: product } } },
                { new: true }
            );

            // If cart already exists
            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $push: { items: { product: product, quantity: quantity } } },
                { new: true }
            ).populate("items.product");
            return res.json({ success: true, data: updatedCart.items, message: "Product added to cart" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    
    removeFromCart: async function(req, res) {
            try {
                const { user, product } = req.body;
                const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $pull: { items: { product: product } } },
                { new: true }
            ).populate("items.product");

            return res.json({ success: true, data: updatedCart.items, message: "Product removed from cart" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    createOrder: async (req, res) => {
        try {
            const { user, items, email, name, phoneNumber, address, city } = req.body;
            const newOrder = new OrderModel({
                user: user,
                email: email,
                name: name, // Add name field
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                items: items
            });
            await newOrder.save();
    
            return res.json({ success: true, data: newOrder, message: 'Order created!' });
            
        } catch(err) {
            return res.json({ success: false, message: err });
        }
    },

    /*
const postFeedback = async (req, res) => {
    try {
        const { userId, productId, feedback } = req.body;
        
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newFeedback = {
            productId: productId,
            feedback: feedback
        };

        user.feedback.push(newFeedback);
        await user.save();

        return res.status(200).json({ success: true, message: 'Feedback posted successfully' });
    } catch(err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
*/
    createAppointment : async (req, res) => {
        try {
            const appointment = new AppointmentModel(req.body);
            await appointment.save();
            res.status(201).send(appointment);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getAppointments : async (req, res) => {
        try {
          const appointments = await AppointmentModel.find();
          res.status(200).send(appointments);
        } catch (error) {
          res.status(500).send(error);
        }
      },
};

module.exports = UserController
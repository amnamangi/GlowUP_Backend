const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
});

const cloudinary = require('cloudinary').v2;
const User = require('../models/user_model');

const ProfileController = {
    uploadProfile: async function (req, res, next) {
        try {
            upload.single('image')(req, res, async err => {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ success: false, message: 'Multer error', error: err.message });
                } else if (err) {
                    return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
                }

                if (!req.file) {
                    return res.status(400).json({ success: false, message: '*Image required.' });
                }

                const uploadedFile = req.file;
                const cloudinaryConfig = {
                    cloud_name: 'donaevbuw',
                    api_key: '815264727685559',
                    api_secret: 'imT5kPc8sSj1aTS5iwKPOhyMx1I',
                    folder: '/fyp_users_pfp', // Replace with the desired folder name
                };

                cloudinary.config(cloudinaryConfig);

                cloudinary.uploader.upload(
                    `data:${uploadedFile.mimetype};base64,${uploadedFile.buffer.toString('base64')}`,
                    {
                        resource_type: 'auto',
                        folder: cloudinaryConfig.folder,
                    },
                    async (cloudinaryErr, cloudinaryResult) => {
                        if (cloudinaryErr) {
                            return res.status(500).json({ success: false, message: 'Cloudinary error', error: cloudinaryErr.message });
                        }

                        try {
                            const userId = req.body.userId;
                            const user = await User.findById(userId);
                            if (!user) {
                                return res.status(404).json({ success: false, message: 'User not found' });
                            }
                            user.profilePicture = { url: cloudinaryResult.secure_url };
                            await user.save();
                        } catch (error) {
                            return res.status(500).json({ success: false, message: 'Error saving profile picture URL', error: error.message });
                        }

                        return res.json({ success: true, message: 'Image uploaded successfully', url: cloudinaryResult.secure_url });
                    }
                );
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
    },
};

module.exports = ProfileController;



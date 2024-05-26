const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        // Use await to ensure the connection is established before proceeding
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        // Log the actual error for better debugging
        console.error('Database connection error:', error);
    }
};

module.exports = dbConnect;

const mongoose = require('mongoose');

// 1. Define the connection string
// Render will use the MONGODB_URI you added in the dashboard
// Your laptop will use the local localhost link
const db_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_record_manager';

// 2. Create the connection function
const connectDB = async () => {
    try {
        await mongoose.connect(db_url);
        console.log("✅ Database Connected Successfully!");
    } catch (err) {
        console.error("❌ Database Connection Error:", err.message);
        process.exit(1); // Stop the app if it can't connect
    }
};

// 3. Execute the connection
connectDB();

module.exports = mongoose;
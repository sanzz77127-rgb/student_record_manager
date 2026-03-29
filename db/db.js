import mongoose from 'mongoose';

// Render will use the MONGODB_URI secret, laptop will use local
const db_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_record_manager';

const connectDB = async () => {
    try {
        await mongoose.connect(db_url);
        console.log("✅ Database Connected Successfully!");
    } catch (err) {
        console.error("❌ Database Connection Error:", err.message);
        process.exit(1);
    }
};

// This matches your 'import' in app.js
export default connectDB;
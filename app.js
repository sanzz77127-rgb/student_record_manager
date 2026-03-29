
import express from 'express';
import route from './routes/route.js';
import connectDB from './db/db.js';
const DATABASEURL = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/';
const app = express();
const port = 3000;

// EJS SETUP
app.set('views', './views');
app.set('view engine', 'ejs');

// 2. MIDDLEWARE (Crucial for reading form data)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// 3. DATABASE CONNECTION
connectDB(DATABASEURL);

// 4. ROUTES
app.use('/', route);

app.listen(port, () => {
  console.log(`Server is running : http://localhost:${port}`);
});
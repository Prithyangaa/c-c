const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key';

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/auth-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // To serve the HTML, CSS, and JS files

// User schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    country: String,
    occupation: String,
    universityCompany: String,
    co2Credits: String
});

const User = mongoose.model('User', UserSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password, phone, country, occupation, universityCompany, co2Credits } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, email, password: hashedPassword, phone, country, occupation, universityCompany, co2Credits
        });
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: 'Error registering user' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: 'Error logging in' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

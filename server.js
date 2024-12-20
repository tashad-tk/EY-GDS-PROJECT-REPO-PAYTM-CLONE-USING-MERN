const express =  require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser =require('body-parser');
const crypto = require('crypto');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true }));
mongoose.connect('mongodb+srv://ve1d:puiQNMy3fUkv3ra7@test-db.dxurd.mongodb.net/?retrywrites=true&w=majority&appName=test-db',
{
    useNewUrlParser: true,
 useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));
 // Define User Schema
 const userSchema = new mongoose. Schema ({
 name: {type: String, required: true },
email: { type: String, required: true, unique: true},
password: {type: String, required: true},
upi_id: { type: String, unique: true},
balance: {type: Number}
});
// Create Transaction Model
const Transaction = mongoose.model('Transaction', transactionSchema);
// Function to generate a unique UPI ID
const generateUIP = () => {
const randomId = crypto.randomBytes(4).toString("hex"); // Generates a random 8-character ID
return '${randomId)@fastpay';
};
// Signup Route
app.post ('/api/signup', async (req, res) => {
try {
const { name, email, password } = req.body;
// Check if user already exists
let user = await User.findOne({ email });
if (user) {
return res.status(400).send({message: 'User already exists'});
}
// Generate UPI ID
const upi_id = generateUIP();
const balance = 1000;

// Create new user
user = new User({ name, email, password, upi_id, balance });
await user.save();
res.status(201).send({message: 'User registered successfully!', upi_id});
} catch (error) {
console.error(error);
res.status(500).send({ message: 'Server error' });
}
});

// Fetch User Details Route
app.get('/api/user/upi_id', async (req, res) => {
    try {
    const { upi_id} = req.params;
    const user= await User.findOne({upi_id});
        if (!user) {
        return res.status(484).send({message: 'User not found'});
        }

        res.status(200).send(user);
        }
        catch (error) {
        console.error(' Error fetching user:', error);
        res.status(500).send({message: 'Server error' });
        }
        });

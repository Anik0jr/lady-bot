const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files (frontend)

let userReferrals = {};

// Root endpoint (to serve the mini-app)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle referral system
app.post('/referral', (req, res) => {
    const userId = req.body.user_id;
    const referralCode = req.body.referral_code;

    if (!userReferrals[userId]) {
        userReferrals[userId] = referralCode;
        res.json({ success: true, message: 'Referral code applied!' });
    } else {
        res.json({ success: false, message: 'Referral code already used.' });
    }
});

// Handle reward button click
app.post('/reward', (req, res) => {
    const userId = req.body.user_id;
    console.log(`User ${userId} clicked reward button.`);

    // Reward logic here
    res.json({ success: true, message: 'Reward credited!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

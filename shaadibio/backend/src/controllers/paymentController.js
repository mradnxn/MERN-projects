const User = require("../models/User");
const { generateToken } = require("../controllers/authController");

const upgradeToPremium = async (req, res) => {
    try {
        const userId  = req.user._id;
        const user = await User.findByIdAndUpdate(
            userId,
            {
                isPremium: true,
                premiumExpiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            },
            { returnDocument: 'after' }
        );

        if(user){
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isPremium: user.isPremium,
                premiumExpiryDate: user.premiumExpiryDate,
                token: generateToken(user._id),
            });
        }else{
            res.status(404).json({ error: "User not found" });
        }

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { upgradeToPremium };
const User = require("../models/userDb");

const saveUser = async (req, res) => {
    try {
        const { name, phoneNumber } = req.body;
        const oldUser = await User.findOne({ phoneNumber });

        if (oldUser) {
            return res.json(oldUser);
        }

        const user = new User({
            name: name,
            phoneNumber: phoneNumber
        });
        await user.save();

        return res.json({ user });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
}


const getUser = async (req, res) => {
    try {
        let userId = req.params.id;
        userId = userId.trim(); 

        if (!userId || userId === '') {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json({ user });

    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: "Invalid user ID" });
        }
        res.status(500).send('Server Error');
    }
}


const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page if not provided
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit);
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users,
            page,
            totalPages,
            totalUsers
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ msg: "Search query is required" });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },  // Case-insensitive search by name
                { phoneNumber: { $regex: query, $options: 'i' } }  // Case-insensitive search by phone number
            ]
        });

        res.json({ users });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { saveUser, getUser, getAllUsers, searchUsers };

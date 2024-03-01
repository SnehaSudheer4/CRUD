const Admin = require('../Model/adminModel');
const Form = require('../Model/formModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../Model/userModel');
const maxAge = 3 * 24 * 60 * 60;

const createAdminToken = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, '@@@@@@');
    const admin = await Admin.findOne({ email: email });
    console.log(admin, '#####');
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      console.log(auth);
      if (auth) {
        const token = createAdminToken(admin._id);
        console.log('Admin logged in successfully. Token:', token);
        res.status(200).json({
          message: 'Login successful',
          admin: admin,
          token: token,
          status: true,
        });
      } else {
        res
          .status(401)
          .json({ message: 'Incorrect email or password', status: false });
      }
    } else {
      res.status(404).json({ message: 'Admin not found', status: false });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error', status: false });
  }
};

const getUpdates = async (req, res) => {
  try {
    const updates = await Form.find();
    res.status(200).json(updates);
  } catch (error) {
    console.error('error fetching updates', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

const adminHeader = async (req, res) => {
  try {
    const admin = req.admin;
    res.json({ admin: admin, status: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', status: false });
  }
};

const handleSearch = async (query) => {
  try {
    const dates = await Form.find({ date: query });
    const formdata = dates.map((form) => ({
      email: form.email,
      date: form.date,
      details: form.details,
    }));
    return formdata;
  } catch (error) {
    console.error('Error searching forms:', error.message);
    throw error; 
  }
};

const getUserlist = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User blocked successfully', user });
  } catch (error) {
    console.error('Error blocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User unblocked successfully', user });
  } catch (error) {
    console.error('Error unblocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  getUpdates,
  loginAdmin,
  adminHeader,handleSearch,getUserlist,blockUser,unblockUser
};

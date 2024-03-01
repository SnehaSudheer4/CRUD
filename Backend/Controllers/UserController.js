const Form = require('../Model/formModel');
const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
require('dotenv').config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    // const existingUsername = await User.findOne({ username: username });
    // if (existingUsername) {
    //   return res.status(400).json({ message: 'Username already exists' });
    // }
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, '@@@@@@');
    const user = await User.findOne({ email: email });
    console.log(user, '#####');
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      console.log(auth);
      if (auth) {
        const token = createToken(user._id);
        console.log('user logged in successfully. Token:', token);
        res
          .status(200)
          .json({ message: 'Login successful', user, token, status: true });
        return;
      } else {
        res.json({ message: 'password incorrect', status: false });
        return;
      }
    } else {
      res.json({ message: 'user not found', status: false });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const taskUpdation = async (req, res) => {
  const { name, date, details, email } = req.body;
  try {
    const newTask = new Form({ name, date, details, email });
    await newTask.save();
    res.status(201).json({ message: 'successfully added updation' });
  } catch (error) {
    console.log('error regestering updation:', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

const getUserData = async (req, res) => {
  try {
    const { email } = req.params;
    // console.log('email',email);
    const userData = await Form.find({ email });
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// const getUserData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userData = await Form.find({ userId: id });
//     res.json(userData);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const Updates = async (req, res) => {
  try {
    const updates = await Form.find();
    res.status(200).json(updates);
  } catch (error) {
    console.error('error fetching updates', error.message);
    res.status(500).json({ message: 'internal server error' });
  }
};

const userHeader = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user: user, status: true });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', status: false });
  }
};


const editUpdates = async (req, res) => {
  const { detailsId } = req.params;
  const updateDetails = req.body;
  try {
    const updatedData = await Form.findByIdAndUpdate(detailsId, updateDetails, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    console.error('Error updating details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const editUpdates = async (req, res) => {
//   const { detailsId } = req.params;
//   const updateDetails = req.body;
  
  
//   const currentHour = new Date().getHours();
//   if (currentHour >= 0 && currentHour < 12) {
//     try {
//       const updatedData = await Form.findByIdAndUpdate(detailsId, updateDetails, {
//         new: true,
//       });
//       if (!updatedData) {
//         return res.status(404).json({ message: 'Event not found' });
//       }
//       res.status(200).json(updatedData);
//     } catch (error) {
//       console.error('Error updating details:', error.message);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
    
//     res.status(403).json({ message: 'Editing is not allowed at this time' });
//   }
// };


module.exports = {
  registerUser,
  loginUser,
  taskUpdation,
  userHeader,
  getUserData,
  Updates,
  editUpdates,
};

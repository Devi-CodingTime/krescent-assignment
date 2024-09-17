import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';

// export const authenticate = async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email:email });
//   console.log(user, "kjhjhgh")
//   if (!user) {
//     return res.status(401).json({ error: 'Invalid email or password' });
//   }
//   const isValid = await bcrypt.compare(password, user.password);
//   console.log("isValid ",isValid)
//   if (!isValid) {
//     return res.status(401).json({ error: 'Invalid email or password' });
//   }
//   const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
//   res.json({ token });
// };


export const authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '3d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// async function createSuperadminUser() {    { expiresIn: '1h' } 
//   try {
//     const users = await User.find();
//     if (users.length === 0) {
//       const hashedPassword = await bcrypt.hash('123456', 10);
//       const superadminUser = new User({
//         username: 'Admin',
//         password: hashedPassword,
//         email: 'admin@gmail.com',
//         role: 'Admin'
//       });
//       await superadminUser.save();
//       console.log('Superadmin user created successfully');
//     } else {
//       console.log('User collection is not empty');
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// Call the function to create superadmin user

async function createSuperadminUser() {
  try {
    const users = await User.find();
    if (users.length === 0) {
      const superadminUser = new User({
        username: 'Admin',
        password: '123456', // plaintext password
        email: 'admin@gmail.com',
        role: 'Admin'
      });
      await superadminUser.save();
      console.log('Admin created successfully');
    } else {
      console.log('User collection is not empty');
    }
  } catch (err) {
    console.error(err);
  }
}

createSuperadminUser();
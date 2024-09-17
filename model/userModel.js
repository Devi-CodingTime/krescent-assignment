import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['Admin', 'Driver', 'User'], 
    required: true 
  }
},{timestamps: true});

userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
   const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
  }
  next();
});

export default mongoose.model('User', userSchema);


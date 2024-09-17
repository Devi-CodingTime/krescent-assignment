import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  driverId: { 
    type: String, 
    required: true, 
    unique: true 
},
  name: { 
    type: String, 
    required: true 
},
  email: {
     type: String, 
     required: true 
    },
  phone: { 
    type: String, 
    required: true 
},
  vehicleType: { 
    type: String, 
    required: true 
},
  status: { 
    type: String, 
    enum: ['active', 'inactive'], 
    required: true 
}

},{timestamps: true});

export default mongoose.model('Driver', driverSchema);
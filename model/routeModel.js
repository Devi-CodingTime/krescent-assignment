

import mongoose from 'mongoose';

// Define order schema
const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true
  },
  orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
  steps: [{
    location: {
      type: String,
      required: true
    },
    createdAt:{
      type: Date,
      default: Date.now()
    },
    updatedAt:{
      type: Date,
      default: Date.now()
    }
  }],
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    required: true 
  },
  distanceTraveled: {
    type: Number,
    default: 0
  },
  timeSpentOnline: {
    type: Number,
    default: 0
  },
  distanceUnits: {
    type: String,
    default: 'kilometer'
  },
  timeUnits: {
    type: String,
    default:'minutes'
  },
},
{timestamps: true});

// Define order model
export default mongoose.model('route', routeSchema);
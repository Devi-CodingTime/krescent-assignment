import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId:
   { 
    type: String, 
    required: true, 
    unique: true 
   },
  customerName: {
     type: String, 
     required: true 
    },
  deliveryAddress: { 
    type: String, 
    required: true 
},
  orderStatus: { 
    type: String, 
    enum: ['pending', 'dispatched', 'delivered', 'canceled'], 
    required: true 
},
  totalAmount: { 
    type: Number, 
    required: true 
}
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
// },
//   updatedAt: {
//      type: Date, 
//      default: Date.now 
//     }
},
{timestamps: true});

export default mongoose.model('Order', orderSchema);
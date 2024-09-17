import OrderModel from "../model/orderModel.js"
import shortid from 'shortid';

export const createOrder = async (req, res) => {
  const { customerName, deliveryAddress, orderStatus, totalAmount } = req.body;
  if(!customerName)
    return res.status(400).send({ message: 'Customer name is required'});
  if(!deliveryAddress)
    return res.status(400).send({ message: 'Delivery address is required'});
  if(!orderStatus)
    return res.status(400).send({ message: 'Order status is required'});
  if(!totalAmount)
    return res.status(400).send({ message: 'Total amount is required'});

  const orderId = `ORD${shortid.generate()}`;
  const order = new OrderModel({...req.body, orderId:orderId});
  try {
    const orderData = await order.save();
    res.status(200).send({success:true, message: 'Order created successfully',data:orderData });
  } catch (error) {
    console.log("error", error.code);
    if(error.code==11000)
      return res.status(400).send({ message: 'Order ID already exists' });

    res.status(500).send({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  const { search} = req.query;
  try{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchQuery = {
      customerName: { $regex: search, $options: 'i' }
    }
    // const searchQuery = {
    //   $or: [
    //     { customerName: { $regex: search, $options: 'i' } },
    //     { deliveryAddress: { $regex: search, $options: 'i' } },
    //     { orderStatus: { $regex: search, $options: 'i' } }
    //   ]
    // }
    // const totalOrders = await OrderModel.countDocuments(searchQuery);
    const orders = await OrderModel.find().skip(page).limit(pageSize);
    res.status(200).send({success:true, 
      message: 'Order fetched successfully',
      data:orders,
      // totalrecords:search? totalOrders?.length : orders?.length
      });

  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try{
    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.status(200).send({success:true, message: 'Order fetched successfully',data:order })

  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await OrderModel.findOne({ orderId });
  if (!order) {
    return res.status(404).send({ error: 'Order not found' });
  }
  // order.set(req.body);
  try {
    // await order.save();
    const updatedOrder = await OrderModel.findOneAndUpdate({orderId:orderId}, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).send({ error: 'Order not found' });
    }
    res.status(200).send({success:true, message: 'Order updated successfully', data: updatedOrder});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await OrderModel.findOne({ orderId:orderId });
  if (!order) {
    return res.status(404).send({ error: 'Order not found' });
  }
  try {
    // await order.remove();
    await OrderModel.findOneAndDelete({orderId:orderId});
    res.status(200).send({success:true, message: 'Order deleted successfully' });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

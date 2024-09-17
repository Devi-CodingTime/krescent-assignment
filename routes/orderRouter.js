import express from 'express';
const router = express.Router();
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controller/orderController.js';

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrder);
router.put('/orders/:orderId', updateOrder);
router.delete('/orders/:orderId', deleteOrder);

export default router;  
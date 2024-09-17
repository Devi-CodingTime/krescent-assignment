import express from 'express';
const router = express.Router();
import { createDriver, getDrivers, getDriver, updateDriver, deleteDriver } from '../controller/driverController.js';

import { calculateDriverPayment } from '../controller/paymentController.js';

router.post('/drivers', createDriver);
router.get('/drivers', getDrivers);
router.get('/drivers/:driverId', getDriver);
router.put('/drivers/:driverId', updateDriver);
router.delete('/drivers/:driverId', deleteDriver);
router.get('/payment', calculateDriverPayment);
export default router;
import express from 'express';
const router = express.Router();
import { createRoute, getRoute, getSingleRoute, updateRoute, deleteRoute } from '../controller/routeController.js';

router.post('/routes', createRoute);
router.get('/routes', getRoute);
router.get('/routes/:routeId', getSingleRoute);
router.put('/routes/:routeId', updateRoute);
router.delete('/routes/:routeId', deleteRoute);

export default router;
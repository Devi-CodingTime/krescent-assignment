import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

//databse config
connectDB();
//PORT
const PORT = process.env.PORT;

import cors from "cors";
app.use(cors());
app.use(express.json());

import DriverRouter from './routes/driverRouter.js';
import RouteRouter from './routes/routeRouter.js';
import OrderRouter from './routes/orderRouter.js';
import AuthRouter from './routes/authRouter.js';
import AuthMiddleware from './middleware/auth.js';

app.use('/', (req,res)=>{
    res.send('API is running...');
});
app.use('/api/auth', AuthRouter);
app.use(AuthMiddleware);
app.use('/ordersapi', OrderRouter);
app.use('/driversapi', DriverRouter);
app.use('/routesapi', RouteRouter);

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });






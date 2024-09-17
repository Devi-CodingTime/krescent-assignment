import routeModel from "../model/routeModel.js";
import driverModel from "../model/driverModel.js";
import orderModel from "../model/orderModel.js";
export const calculateDriverPayment = async (req,res) => {
    
    const routes = await routeModel.find({status:'completed'});
    const ordersCompleted = routes?routes.length:0;
    const deleveredOrder = await orderModel.find({ status: 'delivered' });

    let payment = 0;
  
    deleveredOrder.forEach((route) => {
      payment+=route.totalAmount;
    });

    routes?.forEach((route) => {
        payment+=calculatePaymentAmount(ordersCompleted, route.timeSpentOnline, route.distanceTraveled);
      });
  
  
     res.status(200).send({
        success:true,
        mesage: 'Successfully Calculated Payment',
        paymentAmount:payment
    });    
};
  
  const calculatePaymentAmount = (ordersCompleted, timeSpentOnline, distanceTraveled) => {
    const basePayment = ordersCompleted * 50; // 100 rs per order completed
    const timeBonus = timeSpentOnline * 1;  // 1 rs per minute
    const distanceBonus = distanceTraveled * 10; // 10 rs per kilometer
    return basePayment + timeBonus + distanceBonus;
  };
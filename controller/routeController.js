import routeModel from "../model/routeModel.js"
import shortid from 'shortid';

export const createRoute = async (req, res) => {
  const { orderId, steps, status } = req.body;
  if(!orderId)
    return res.status(400).send({ message: 'orderId is required'});
  if(!steps)
    return res.status(400).send({ message: 'steps is required'});
  if(!status)
    return res.status(400).send({ message: 'Route status is required'});

  const routeId = `RTE${shortid.generate()}`;
  const route = new routeModel({...req.body, routeId:routeId});
  try {
    const routeData = await route.save();
    res.status(200).send({success:true, message: 'Route created successfully',data:routeData });
  } catch (error) {
    console.log("error", error.code);
    if(error.code==11000)
      return res.status(400).send({ message: 'Route ID already exists' });

    res.status(500).send({ error: error.message });
  }
};

export const getRoute = async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const routes = await routeModel.find().skip(page).limit(pageSize);
    res.status(200).send({
        success:true, 
        message: 'Route fetched successfully',
        data:routes
      });

  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getSingleRoute = async (req, res) => {
  const routeId = req.params.routeId;
  try{
    const route = await routeModel.findOne({ routeId });
    if (!route) {
      return res.status(404).send({ error: 'Route not found' });
    }
    res.status(200).send({success:true, message: 'Route fetched successfully',data:route })

  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateRoute = async (req, res) => {
  const routeId = req.params.routeId;
  const route = await routeModel.findOne({ routeId });
  if (!route) {
    return res.status(404).send({ error: 'route not found' });
  }
  // route.set(req.body);
  try {
    // await route.save();
    const updatedRoute = await routeModel.findOneAndUpdate({routeId:routeId}, req.body, { new: true });
    if (!updatedRoute) {
      return res.status(404).send({ error: 'route not found' });
    }
    res.status(200).send({success:true, message: 'route updated successfully', data: updatedRoute});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteRoute = async (req, res) => {
  const routeId = req.params.routeId;
  const route = await routeModel.findOne({ routeId:routeId });
  if (!route) {
    return res.status(404).send({ error: 'Route not found' });
  }
  try {
    // await route.remove();
    await routeModel.findOneAndDelete({routeId:routeId});
    res.status(200).send({success:true, message: 'Route deleted successfully' });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

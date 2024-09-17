import driverModel from "../model/driverModel.js";

import shortid from 'shortid';

export const createDriver = async (req, res) => {
  const { name, email, phone, vehicleType, status } = req.body;
  if(!name)
    return res.status(400).send({ message: 'name is required'});
  if(!email)
    return res.status(400).send({ message: 'email address is required'});
  if(!phone)
    return res.status(400).send({ message: 'phone number is required'});
  if(!vehicleType)
    return res.status(400).send({ message: 'vehicleType is required'});
  if(!status)
    return res.status(400).send({ message: 'Status is required'});

 

const driverId = `DRV${shortid.generate()}`;
console.log(driverId);

  const driver = new driverModel({...req.body, driverId:driverId});
  try {
    const driverData = await driver.save();
    res.status(200).send({success:true, message: 'Driver created successfully',data:driverData });
  } catch (error) {
    console.log("error", error.code);
    if(error.code==11000)
      return res.status(400).send({ message: 'Driver ID already exists' });

    res.status(500).send({ error: error.message });
  }
};
export const getDrivers = async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    const drivers = await driverModel.find().skip(page).limit(pageSize);
    res.status(200).send({
      success:true, 
      message: 'Drivers fetched successfully',
      data:drivers
      });
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
  };
  
export const getDriver = async (req, res) => {
    const driverId = req.params.driverId;
    try{
      const driver = await driverModel.findOne({ driverId });
      if (!driver) {
        return res.status(404).send({ error: 'Driver not found' });
      }
      res.status(200).send({success:true, message: 'Driver fetched successfully',data:driver })
    }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
  };
  
  export const updateDriver = async (req, res) => {
    const driverId = req.params.driverId;

    try {
      const updatedDriver = await driverModel.findOneAndUpdate({driverId:driverId}, req.body, { new: true });
    if (!updatedDriver) {
      return res.status(404).send({ error: 'Driver not found' });
    }
      res.status(200).send({success:true, message: 'Driver updated successfully', data:updatedDriver });
    } catch (error) {
      res.status(500).json({ error: 'Error updating driver' });
    }
  };
  
  export const deleteDriver = async (req, res) => {
    const driverId = req.params.driverId;
    const driver = await driverModel.findOne({ driverId });
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    try {
    await driverModel.findOneAndDelete({driverId:driverId});
    res.status(200).send({success:true, message: 'Driver deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
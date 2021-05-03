import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post('/'), isAuth, expressAsyncHandler(async(req,res) => {
  if(req.body.orderItems.length === 0) {
    res.status.send(400).send({message: '장바구니가 비었습니다.'});
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id
    });
    const createdOrder = await order.save();
    res.status(201).send({message: 'New Order Created', order: createdOrder});
  }
})

export default orderRouter;
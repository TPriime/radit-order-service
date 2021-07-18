const Order = require("../models/order");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;

module.exports.createOrder = async (req, res) => {
  const order = new Order({
    customerId: req.body.customerId,
    productIds: req.body.productIds,
    amount: req.body.amount,
  });
  await order.save();
  return res.status(200).json({
    status: Success.SUCCESS,
    message: Success.CREATED_ORDER_DATA,
    order: order,
  });
};

module.exports.getOrderById = async (req, res) => {
  await Order.findOne(
    {
      _id: req.params.orderId
    },
    {
      updatedAt: 0,
      __v: 0,
    },
    (error, order) => {
      if (error || !order) {
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.ORDER_NOT_EXISTS,
        });
      }
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_ORDER_DATA,
        order: order,
      });
    }
  );
};

module.exports.getAllOrders = async (req, res) => {
  await Order.find(
    {},
    (error, order) => {
      if (error || !order) {
        return res.status(403).json({
          status: Errors.FAILED,
          message: Errors.FAILED,
        });
      }
      return res.status(200).json({
        status: Success.SUCCESS,
        message: Success.FETCHED_ORDER_DATA,
        orders: order,
      });
    }
  );
};
const router = require("express").Router();
const { internalServerError } = require("../utils/response");
const OrderController = require("../controllers/order");
const OrderMiddlewares = require("../middlewares/order");

router.put("/",
  OrderMiddlewares.validateOrder,
  async (req, res) => {
    try {
      await OrderController.createOrder(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.get(
  "/all",
  async (req, res) => {
    try {
      await OrderController.getAllOrders(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

router.get(
  "/:orderId",
  async (req, res) => {
    try {
      await OrderController.getOrderById(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);

module.exports = router;

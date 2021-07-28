const Errors = require("../utils/constants").errors;
const Validators = require("../utils/validators");
const productClient = require("../../rpc/clients/productClient");

function _sendError(message, error, res, status) {
  return res.status(status || 400).json({
    status: Errors.FAILED,
    message: message,
    error: error,
  });
}

/* 
  order validation middleware
  - checks if paramers are correct 
  - and if products exist
*/
module.exports.validateOrder = async (req, res, next) => {
  const { error } = Validators.orderValidation(req.body);
  if (error) return _sendError(error.details[0].message, error, res);

  // check for non existing product id
  try {
    for (productId of req.body.productIds) {
      const available = (await productClient.getProductById(productId)).status;
      if (!available) return _sendError(Errors.PRODUCT_NOT_EXISTS, error, res);
    }
  } catch (err) {
    console.log(`error connecting to client: ${err}`);
    return _sendError(Errors.INTERNAL_SERVER_ERROR, err, res, 500);
  }
  next();
};
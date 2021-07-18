const Errors = require("../utils/constants").errors;
const Validators = require("../utils/validators");
const productClient = require("../../rpc/clients/productClient");

function _sendError(message, error, res) {
  return res.status(400).json({
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
    for(productId in req.body.productIds) {
        const available = (await productClient.getProductById(productId)).status;
        if(!available) return _sendError(Errors.PRODUCT_NOT_EXISTS, error, res);
    }
    next();
};
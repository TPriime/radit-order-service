// validation
const Joi = require("@hapi/joi");

// customerId, productId, amount
const orderValidation = (data) => {
  const schema = Joi.object({
    customerId: Joi.string().min(3).max(256).required(),
    productIds: Joi.array().items(
        Joi.string().min(24).max(24))
      .min(1).required(),
    amount: Joi.number().min(1).required(),
  });

  return schema.validate(data);
};

module.exports.orderValidation = orderValidation;

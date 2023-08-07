import Joi from "joi";

export default Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "The email field is required.",
    "string.email": "The email must be a valid email.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "The password field is required.",
  }),
});

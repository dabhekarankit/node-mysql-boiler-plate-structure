import Joi from "joi";

export default Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "The name field is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "The email field is required.",
    "string.email": "The email must be a valid email.",
  }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "The password field is required.",
    "string.min": "Password length must be at least 8 characters long",
  }),
});

import GeneralError from "../exceptions/general-error";
import { HTTP_STATUS_CODE } from "../helpers/constants.helper";

export default (err, req, res, next) => {
  console.log(err);
  if (err && err.error && err.error.isJoi) {
    if (err.error.details[0]) {
      return res.status(HTTP_STATUS_CODE.UNPROCESSABLE).json({
        message: err.error.details[0].message,
      });
    }
  }

  if (err instanceof GeneralError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    return res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json({ message: err.message });
  }
};

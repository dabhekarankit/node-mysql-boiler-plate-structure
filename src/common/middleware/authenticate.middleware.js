import passport from "passport";

export default async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

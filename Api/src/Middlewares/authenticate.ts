import User from "../models/user";

export default (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({ errors: "Invalid token" });
  } else {
    User.findById(req.session.userId)
      .select("admin username")
      .then((data: any) => {
        res.locals.isAdmin = data.admin;
        res.locals.username = data.username;
        next();
      })
      .catch(err => {
        console.log("How did we get here", err);
      });
  }
};

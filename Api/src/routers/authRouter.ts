import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import auth from "../Middlewares/authenticate";

class authRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * authenticate
   */
  public authenticate(req: Request, res: Response): void {
    const username: string = req.body.username;
    const password: string = req.body.password;

    User.findOne({ username })
      .select("username admin password")
      .then((data: any) => {
        if (data.password === password) {
          const { _id, username, admin } = data;

          req.session.userId = _id;
          res.status(200).json({
            _id,
            username,
            admin
          });
        } else {
          res.status(401).json({ errors: "Invalid username or password" });
        }
      })
      .catch(err => {
        res.status(401).json({ errors: "Invalid username or password" });
      });
  }

  /**
   * logout
   */
  public logout(req: Request, res: Response): void {
    req.session.destroy(e => {
      if (e) console.log("Something went wrong");
    });

    res.clearCookie("sid");
    res.sendStatus(200);
  }

  routes() {
    this.router.post("/", this.authenticate);
    this.router.post("/logout", auth, this.logout);
  }
}

const authRoutes = new authRouter();
authRoutes.routes();

export default authRoutes.router;

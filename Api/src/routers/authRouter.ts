import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";

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
          req.session.userId = data._id;
          res.sendStatus(200);
        } else {
          res.status(401).json({ errors: "Invalid username or password" });
        }
      })
      .catch(err => {
        const status = res.statusCode;

        res.json({
          status,
          err
        });
      });
  }

  routes() {
    this.router.post("/", this.authenticate);
  }
}

const authRoutes = new authRouter();
authRoutes.routes();

export default authRoutes.router;

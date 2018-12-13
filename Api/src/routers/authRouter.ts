import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import * as jwt from "jsonwebtoken";

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
        const status = res.statusCode;

        if (data.password === password) {
          jwt.sign(
            { username: data.username, admin: data.admin },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
            (err, token) => {
              res.json({
                status,
                token
              });
            }
          );
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

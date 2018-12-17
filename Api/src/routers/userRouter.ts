import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";
import * as uid from "uid-safe";
import auth from "../Middlewares/authenticate";

class userRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * getUsers
   */
  public getUsers(req: Request, res: Response): void {
    User.find({})
      .then(data => {
        const status = res.statusCode;

        res.json({
          status,
          data
        });
      })
      .catch(err => {
        const status = res.statusCode;

        res.json({
          status,
          err
        });
      });
  }

  /**
   * getUser
   */
  public getUser(req: Request, res: Response): void {
    const username: string = req.params.username;

    User.findOne({ username })
      .then(data => {
        const status = res.statusCode;

        res.json({
          status,
          data
        });
      })
      .catch(err => {
        const status = res.statusCode;

        res.json({
          status,
          err
        });
      });
  }

  /**
   * createUser
   */
  public createUser(req: Request, res: Response): void {
    const username: string = req.body.username;
    const password: string = req.body.password; // TODO hash or something
    const email: string = req.body.email;
    const streamKey: string = uid.sync(39);
    const admin: boolean = req.body.admin;

    const user = new User({
      username,
      password,
      email,
      streamKey,
      admin
    });

    user
      .save()
      .then(data => {
        const status = res.statusCode;

        res.json({
          status,
          data
        });
      })
      .catch(err => {
        const status = res.statusCode;

        res.json({
          status,
          err
        });
      });
  }

  /**
   * updateUser
   * TODO: Should probably disallow to change like their id
   */
  public updateUser(req: Request, res: Response): void {
    const username: string = req.params.username;

    if (res.locals.isAdmin || username === res.locals.username) {
      User.findOneAndUpdate({ username }, req.body)
        .then(data => {
          const status = res.statusCode;

          res.json({
            status,
            data
          });
        })
        .catch(err => {
          const status = res.statusCode;

          res.json({
            status,
            err
          });
        });
    } else {
      res.status(401).json({ errors: "Unauthorized" });
    }
  }

  /**
   * deleteUser
   */
  public deleteUser(req: Request, res: Response): void {
    const username: string = req.params.username;

    if (res.locals.isAdmin || username === res.locals.username) {
      User.findOneAndRemove({ username })
        .then(data => {
          const status = res.statusCode;

          res.json({
            status,
            data
          });
        })
        .catch(err => {
          const status = res.statusCode;

          res.json({
            status,
            err
          });
        });
    } else {
      res.status(401).json({ errors: "Unauthorized" });
    }
  }

  routes() {
    this.router.get("/", this.getUsers);
    this.router.get("/:username", this.getUser);
    this.router.post("/", this.createUser);
    this.router.put("/:username", auth, this.updateUser);
    this.router.delete("/:username", auth, this.deleteUser);
  }
}

const userRoutes = new userRouter();
userRoutes.routes();

export default userRoutes.router;

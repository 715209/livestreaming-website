import { Router, Request, Response, NextFunction } from "express";
import User from "../models/user";

class publishRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * publish
     */
    public publish(req: Request, res: Response): void {
        const streamKey: string = req.body.name;

        // Should return 2xx to allow, 3xx to redirect, anything else to deny.
        // Check if streamkey exists.
        User.findOneAndUpdate({ streamKey }, { "streaming.live": true })
            .then((data) => {
                if (data !== null) {
                    res.set('location', data.username);
                    res.status(302).send()
                } else {
                    res.sendStatus(418);
                }
            })
            .catch((err) => {
                console.log("How did we get in here?");
                res.sendStatus(418);
            });
    }

    /**
     * publishDone
     */
    public publishDone(req: Request, res: Response): void {
        const streamKey: string = req.body.name;

        // Set the stream offline
        User.findOneAndUpdate({ streamKey }, { "streaming.live": false })
            .then((data) => {
                // Don't really have to send this
                res.sendStatus(200);
            })
            .catch((err) => {
                console.log("How did we get in here?");
                res.sendStatus(418);
            });
    }

    routes() {
        this.router.post("/", this.publish);
        this.router.post("/done", this.publishDone);
    }
}

const publishRoutes = new publishRouter();
publishRoutes.routes();

export default publishRoutes.router;
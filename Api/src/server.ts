import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";

// Import routers
import userRouter from './routers/userRouter';
import publishRouter from './routers/publishRouter';
// Server class
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config() {
        const MONGO_URI = "mongodb://localhost/project44";

        mongoose.connect(MONGO_URI || process.env.MONGODB_URI, { useNewUrlParser: true });

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void {
        let router: express.Router;

        router = express.Router();

        this.app.use("/", router);
        this.app.use("/api/v1/publish", publishRouter);
        this.app.use("/api/v1/users", userRouter);
    }
}

export default new Server().app;
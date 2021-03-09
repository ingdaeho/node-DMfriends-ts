import express, { Express } from "express";
import { generalErrorHandler } from "./errors";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";

const logger = morgan("dev");

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(routes);

app.use(generalErrorHandler);

export default app;

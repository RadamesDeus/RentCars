import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import AppError from "@errors/AppError";

import "express-async-errors";

import "./container";
import routes from "./routes";
import swaggerFile from "./swagger.json";
import "./database/typeorm";
// import "dotenv/config";
console.log("process.env.PG_HOST", process.env.PG_HOST);

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error!",
    });
  }
);

app.listen(3333, () => {
  console.log("👀 Server started port 3333");
});

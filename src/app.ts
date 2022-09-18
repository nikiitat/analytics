import express, { json } from "express";
import morgan from "morgan";

import "./db/mongoDB";

import errorHandler from "./middleware/errorHandler";
import pageViewsRouter from "./routes/pageViewsRouter";

const app = express();

const { PORT, NODE_ENV } = process.env;

app.use(json());

if (process.env.NODE_ENV === "development") {
  morgan.token("req-body", (req: express.Request) => JSON.stringify(req.body));

  app.use(
    morgan(
      ":method :url :req-body - :status :response-time ms :res[content-length]"
    )
  );
}

app.use("/analytics/pageViews", pageViewsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running in ${NODE_ENV} mode on: http://localhost:${PORT}`
  );
});

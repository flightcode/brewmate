import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import sanitize from "express-mongo-sanitize";
import logger from "./utils/logger";
import User from "./routes/user";
import Beer from "./routes/beer";
import Brewery from "./routes/brewery";

// MongoDB Connection Setup
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

// Express Server Setup
const server = express();

server.use(cors());
server.use(express.json());
server.use(sanitize());
server.use(logger);

// 404 Catch ALl
server.all("/", (req, res) => {
  res.sendStatus(404);
});

// Server Status
server.get("/status", (req, res) => {
  res.status(200).send({ status: "active" });
});

// Sub Routers
server.use("/user", User);
server.use("/beer", Beer);
server.use("/brewery", Brewery);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

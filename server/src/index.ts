import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./routes/user";
import Beer from "./routes/beer";
import Brewery from "./routes/brewery";

const server = express();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

server.use(cors());
server.use(express.json());

// 404 Catch ALl
server.all("/", (req, res) => {
  res.sendStatus(404);
});

// Sub Routers
server.use("/api", User);
server.use("/api", Beer);
server.use("/api", Brewery);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

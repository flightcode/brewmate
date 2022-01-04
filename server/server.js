const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.DB_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.error(err)
);

mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json());

app.use(require("./routes/beer"));
 
app.listen(process.env.PORT || 5000, 
  () => console.log(`Server is running on port: ${port}`)
);
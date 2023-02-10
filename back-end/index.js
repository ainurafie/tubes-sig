const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/v1/admin");
const userRoutes = require("./routes/v1/user");
const { errorHandler } = require("./controllers/v1/errors");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const isDevelopment = process.env.NODE_ENV !== "production";

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(helmet());
app.use(cors());

app.use(cors());
app.disable("x-powered-by");
app.use(compression());
app.use(
  helmet({
    crossOriginEmbedderPolicy: isDevelopment,
    contentSecurityPolicy: isDevelopment,
  })
);

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use(errorHandler);
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const port = isDevelopment ? process.env.PORT : 3000;
    app.listen(port, () => {
      console.log(`listening to port server ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

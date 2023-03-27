//External imports:
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");

//internal imports:
const connectDb = require("./config/connectDb");
const userRouter = require("./routes/userRoutes");
const transectionRouter = require("./routes/transectionRoutes");

//rest object:
const app = express();

//config dotenv:
dotenv.config();
//database call:
connectDb();

//middlewears:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

//routes:
//user routes:
app.use("/api/v1/users", userRouter);

//transection routes:
app.use("/api/v1/transections", transectionRouter);

app.get("/", (req, res) => {
  res.send("Hello Server");
});

//port:
const PORT = 8080 || process.env.PORT;

//listening server:

app.listen(PORT, () => {
  console.log(`Server running at  ${PORT}`);
});

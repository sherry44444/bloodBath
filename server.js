const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/api/user/index");
const donationRouter = require("./routes/api/donation/index");
const cors = require("cors");
const path = require("path");

console.log(process.env.NODE_ENV);

const mongoUri =
  process.env.NODE_ENV == "dev"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-i4u1s.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("succesful");
    console.log(mongoUri);
  })
  .catch(err => console.log(err));

const app = express();

//cors
app.use(cors());

//middleware
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname + "client/public/index.html"));

//react form bi mat xxx-urlrecoded nen data no gui di o dang json chu ko bi ma hoa nua nen khi post data dang raw (json) (tu frontedn dang dung react) thi phai dung middleware o duoi
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/donations", donationRouter);

const port = Number(process.env.PORT || 8888);

app.listen(port, () => {
  console.log(`app running on ${port}`);
});

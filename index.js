const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const accountsRoute = require("./controllers/accounts");
app.use("/api/accounts", accountsRoute);
//   api/accounts/sayHello
const port = 5090;
const url =
  "mongodb+srv://kiost_user:f5FlYHZCPvL5cdaO@cluster0.zv9t4.mongodb.net/kiosk_db?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then((results) => {
    console.log(results);
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

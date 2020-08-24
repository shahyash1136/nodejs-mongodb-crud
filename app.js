const express = require("express");
const mongoose = require("mongoose");
const formData = require("./models/userDataModel");
const userRoutes = require("./routes/users");
const methodOveerride = require("method-override");
const url = "mongodb://localhost:27017/demo_db";
const app = express();

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist")); // redirect JS jQuery
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap
/* app.use(express.static("public")); */

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((client) => {
    console.log("Connected to Database");
  })
  .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOveerride("_method"));

app.get("/", async (req, res) => {
  const userData = await formData.find();
  res.render("index", { userData: userData });
});

app.use("/users", userRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Connected to port number ${port}`);
});

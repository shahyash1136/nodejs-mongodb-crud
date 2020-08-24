const express = require("express");
const formData = require("../models/userDataModel");
const routes = express.Router();

routes.get("/new", (req, res) => {
  res.render("form", { userData: new formData() });
});

routes.post(
  "/",
  async (req, res, next) => {
    req.userData = new formData();
    next();
  },
  saveUserAndRedirect("new")
);

routes.put(
  "/:id",
  async (req, res, next) => {
    req.userData = await formData.findById(req.params.id);
    next();
  },
  saveUserAndRedirect("edit")
);

routes.get("/edit/:id", async (req, res) => {
  const userData = await formData.findById(req.params.id);
  res.render("edit", { userData: userData });
});

routes.delete("/:id", async (req, res) => {
  await formData.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveUserAndRedirect(path) {
  return async (req, res) => {
    let userData = req.userData;
    userData.firstName = req.body.firstName;
    userData.lastName = req.body.lastName;
    userData.email = req.body.email;
    userData.password = req.body.password;
    try {
      userData = await userData.save();
      res.redirect("/");
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = routes;

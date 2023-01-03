const express = require("express");
const routes = express.Router();

const profile = {
  name: "Anderson Alves",
  avatar: "https://avatars.githubusercontent.com/u/54083111?v=4",
  monthlyBudget: 1000,
  daysPerWeek: 5,
  hoursPerDay: 8,
  vacationPerYear: 4,
};

routes.get("/", (req, res) => res.render("index"));
routes.get("/job", (req, res) => res.render("job"));
routes.get("/job/editar", (req, res) => res.render("job-edit"));
routes.get("/meu-perfil", (req, res) => res.render("profile", { profile }));

module.exports = routes;

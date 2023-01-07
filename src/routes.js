const express = require("express");
const routes = express.Router();

let profile = {
  name: "Anderson Alves",
  avatar: "https://github.com/napunda.png",
  monthlyBudget: 6000,
  daysPerWeek: 5,
  hoursPerDay: 4,
  vacationPerYear: 4,
  hoursValue: 75,
};

const Job = {
  data: [],

  controllers: {
    home(req, res) {
      res.render("index", { jobs: Job.data, profile });
    },
    newJob(req, res) {
      const job = {
        id: Job.data.length ? Job.data[Job.data.length - 1].id + 1 : 1,
        name: req.body.name,
        dailyHours: req.body["daily-hours"],
        amount: (profile.hoursValue * req.body["total-hours"]).toFixed(2),
        createdAt: Date.now(),
        dueDate:
          Date.now() +
          (req.body["total-hours"] / req.body["daily-hours"]) *
            24 *
            3600 *
            1000,
      };
      Job.data.push(job);
      return res.redirect("/");
    },
    job(req, res) {
      res.render("job");
    },
    jobEdit(req, res) {
      res.render("job-edit");
    },
    profile(req, res) {
      res.render("profile", { profile });
    },
    updateProfile(req, res) {
      const monthlyBudget = Number(
        req.body["monthly-budget"].replace("R$", "")
      );
      const daysPerWeek = Number(req.body["days-per-week"]);
      const hoursPerDay = Number(req.body["hours-per-day"]);
      const totalWeekWorked = 52 - Number(req.body["vacation-per-year"]);

      profile = {
        name: req.body.name,
        avatar: req.body.avatar,
        monthlyBudget,
        daysPerWeek,
        hoursPerDay,
        vacationPerYear: req.body["vacation-per-year"],
        hoursValue:
          (monthlyBudget * 12) / (daysPerWeek * hoursPerDay * totalWeekWorked),
      };

      return res.render("profile", { profile });
    },
  },
};

routes.get("/", Job.controllers.home);
routes.get("/job", Job.controllers.job);
routes.get("/job/editar", Job.controllers.jobEdit);
routes.get("/meu-perfil", Job.controllers.profile);

routes.post("/meu-perfil", Job.controllers.updateProfile);
routes.post("/job", Job.controllers.newJob);

module.exports = routes;

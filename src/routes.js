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

  services: {
    getJobFromParams(req) {
      // const CurrentJobId = req.params.job.replace(/[^0-9]/g, "");
      const CurrentJobId = req.params.job.split("-")[1];

      return Job.data.find((job) => Number(job.id) === Number(CurrentJobId));
    },
  },

  controllers: {
    home(req, res) {
      res.render("index", { jobs: Job.data, profile });
    },

    newJob(req, res) {
      const job = {
        id: Job.data.length ? Job.data[Job.data.length - 1].id + 1 : 1,
        name: req.body.name,
        dailyHours: Number(req.body["daily-hours"].trim()),
        totalHours: Number(req.body["total-hours"].trim()),
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

    jobEditView(req, res) {
      const CurrentJob = Job.services.getJobFromParams(req);

      if (!CurrentJob) {
        return res.send("Job não encontrado!");
      }

      res.render("job-edit", { job: CurrentJob });
    },

    jobEdit(req, res) {
      const CurrentJobId = req.params.job.split("-")[1];
      const CurrentJob = Job.services.getJobFromParams(req);

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(CurrentJobId)) {
          return {
            ...job,
            name: req.body.name.trim(),
            dailyHours: Number(req.body["daily-hours"].trim()),
            totalHours: Number(req.body["total-hours"].trim()),
            amount: (profile.hoursValue * req.body["total-hours"]).toFixed(2),
            dueDate:
              Date.now() +
              (req.body["total-hours"] / req.body["daily-hours"]) *
                24 *
                3600 *
                1000,
          };
        }
      });

      return res.redirect(`/job/${CurrentJob.name}-${CurrentJobId}`);
    },

    jobDelete(req, res) {
      const CurrentJobId = req.params.job;

      Job.data = Job.data.filter((job) => {
        if (Number(job.id) !== Number(CurrentJobId)) {
          return job;
        }
      });

      res.redirect("/");
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
routes.get("/job/:job", Job.controllers.jobEditView);
routes.get("/meu-perfil", Job.controllers.profile);

routes.post("/meu-perfil", Job.controllers.updateProfile);
routes.post("/job", Job.controllers.newJob);
routes.post("/job/:job", Job.controllers.jobEdit);
routes.post("/job/delete/:job", Job.controllers.jobDelete);

module.exports = routes;

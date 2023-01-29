const express = require("express");
const routes = express.Router();
const Profile = require("./controllers/Profile");
const Home = require("./controllers/Home");
const Job = require("./controllers/Job");
const EditJob = require("./controllers/EditJob");

routes.get("/", Home.getView);
routes.get("/job", Job.getView);
routes.get("/job/:job", EditJob.getView);
routes.get("/meu-perfil", Profile.getView);

routes.post("/meu-perfil", Profile.updateProfileData);
routes.post("/job", Job.newJob);
routes.post("/job/:job", EditJob.post);
routes.post("/job/delete/:job", Job.jobDelete);

module.exports = routes;

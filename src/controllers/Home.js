const profile = require("../models/Profile");
const Job = require("../models/Job");

const Home = {
  getView(req, res) {
    res.render("index", { jobs: Job.data, profile: profile.get() })
  },
};

module.exports = Home;

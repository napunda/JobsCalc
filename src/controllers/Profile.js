const profile = require("../models/Profile");

const Profile = {
  getView(req, res) {
    res.render("profile", { profile: profile.get() });
  },

  updateProfileData(req, res) {
    const monthlyBudget = Number(req.body["monthly-budget"].replace("R$", ""));
    const daysPerWeek = Number(req.body["days-per-week"]);
    const hoursPerDay = Number(req.body["hours-per-day"]);
    const totalWeekWorked = 52 - Number(req.body["vacation-per-year"]);

    profile.post({
      ...profile.get(),
      name: req.body.name,
      avatar: req.body.avatar,
      monthlyBudget,
      daysPerWeek,
      hoursPerDay,
      vacationPerYear: req.body["vacation-per-year"],
      hoursValue:
        (monthlyBudget * 12) / (daysPerWeek * hoursPerDay * totalWeekWorked),
    });

    return res.render("profile", { profile: profile.get() });
  },
};

module.exports = Profile;

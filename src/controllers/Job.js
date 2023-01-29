const Job = {
  getView(req, res) {
    res.render("job");
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
        (req.body["total-hours"] / req.body["daily-hours"]) * 24 * 3600 * 1000,
    };
    Job.data.push(job);
    return res.redirect("/");
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
};

module.exports = Job;

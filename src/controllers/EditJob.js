const EditJob = {
  getView(req, res) {
    const CurrentJob = Job.services.getJobFromParams(req);

    if (!CurrentJob) {
      return res.send("Job não encontrado!");
    }

    res.render("job-edit", { job: CurrentJob });
  },

  post(req, res) {
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
};

module.exports = EditJob;

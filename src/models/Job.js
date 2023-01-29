const Job = {
  data: [],

  services: {
    getJobFromParams(req) {
      // const CurrentJobId = req.params.job.replace(/[^0-9]/g, "");
      const CurrentJobId = req.params.job.split("-")[1];

      return Job.data.find((job) => Number(job.id) === Number(CurrentJobId));
    },
  },
};

module.exports = Job;

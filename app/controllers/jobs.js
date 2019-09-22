const Job = include("models/job");

class JobsController {
  constructor() {}

  async createJob(user, data) {
    if (
      !data.title ||
      !data.description ||
      !data.company ||
      !data.location ||
      !data.experience ||
      !data.industry
    ) {
      return { status: 400, message: "Parameters missing" };
    }

    console.log(data);
    var job = new Job(data);
    job.user = user._id;
    await job.save();
    return { status: 200, data: job };
  }

  async getMyJobs(user) {
    const jobs = await Job.findByUser(user._id);
    return { status: 200, data: jobs };
  }

  async deleteJob(user, data) {
    const job = await Job.findById(data._id);
    console.log(user);
    console.log(job);
    if (job.user != user._id) {
      return {
        status: 403,
        message: "Only job poster can delete the job"
      };
    }
    await Job.deleteById(data._id);
    const updatedJobsList = await Job.findByUser(user._id);
    return { status: 200, data: updatedJobsList };
  }
}
var exports = (module.exports = new JobsController());

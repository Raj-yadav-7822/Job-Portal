import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import wrapAsyncHandler from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";

// ---------------- APPLY FOR JOB ----------------
export const applyJob = wrapAsyncHandler(async (req, res) => {
  const userId = req.id;
  const jobId = req.params.id;

  if (!jobId) throw new ExpressError(400, "Job id is required.");

  const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
  if (existingApplication) throw new ExpressError(400, "You have already applied for this job.");

  const job = await Job.findById(jobId);
  if (!job) throw new ExpressError(404, "Job not found.");

  const newApplication = await Application.create({ job: jobId, applicant: userId });

  job.applications.push(newApplication._id);
  await job.save();

  res.status(201).json({
    message: "Job applied successfully.",
    success: true,
  });
});

// ---------------- GET APPLIED JOBS (STUDENT) ----------------
export const getAppliedJobs = wrapAsyncHandler(async (req, res) => {
  const userId = req.id;
  const applications = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: { path: "company" },
    });

  res.status(200).json({
    applications,
    success: true,
  });
});

// ---------------- GET APPLICANTS FOR ADMIN ----------------
export const getApplicants = wrapAsyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: { path: "applicant" },
  });

  if (!job) throw new ExpressError(404, "Job not found.");

  res.status(200).json({
    job,
    success: true,
  });
});

// ---------------- UPDATE APPLICATION STATUS (ADMIN) ----------------
export const updateStatus = wrapAsyncHandler(async (req, res) => {
  const { status } = req.body;
  const applicationId = req.params.id;

  if (!status) throw new ExpressError(400, "Status is required.");

  const application = await Application.findById(applicationId);
  if (!application) throw new ExpressError(404, "Application not found.");

  application.status = status.toLowerCase();
  await application.save();

  res.status(200).json({
    message: "Status updated successfully.",
    success: true,
  });
});

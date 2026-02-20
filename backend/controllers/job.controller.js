import { Job } from "../models/job.model.js";

// ---------------- HELPERS ----------------
const validateJobInput = (body) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId,
  } = body;

  if (
    !title ||
    !description ||
    !requirements ||
    !salary ||
    !location ||
    !jobType ||
    !experience ||
    !position ||
    !companyId
  ) {
    return false;
  }
  return true;
};

// ---------------- CONTROLLERS ----------------

// POST JOB - Admin only
export const postJob = async (req, res) => {
  if (!validateJobInput(req.body)) {
    return res.status(400).json({ message: "Missing required fields", success: false });
  }

  const userId = req.id;

  const job = await Job.create({
    title: req.body.title,
    description: req.body.description,
    requirements: req.body.requirements.split(",").map((r) => r.trim()),
    salary: Number(req.body.salary),
    location: req.body.location,
    jobType: req.body.jobType,
    experienceLevel: Number(req.body.experience),
    position: Number(req.body.position),
    company: req.body.companyId,
    created_by: userId,
  });

  return res.status(201).json({
    message: "Job created successfully",
    success: true,
    job,
  });
};

// GET ALL JOBS - Students
export const getAllJobs = async (req, res) => {
  const keyword = (req.query.keyword || "").trim();

  const jobs = await Job.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } },
      { jobType: { $regex: keyword, $options: "i" } },
      { requirements: { $regex: keyword, $options: "i" } },
    ],
  })
    .populate("company")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    jobs,
  });
};

// GET JOB BY ID - Students/Admin
import mongoose from "mongoose";

export const getJobById = async (req, res) => {
  const jobId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid Job ID", success: false });
  }

  const job = await Job.findById(jobId)
    .populate("company")
    .populate({
      path: "applications",
      populate: { path: "applicant" },
    });

  if (!job) return res.status(404).json({ message: "Job not found", success: false });

  return res.status(200).json({ job, success: true });
};


// GET JOBS CREATED BY Admin
export const getAdminJobs = async (req, res) => {
  const adminId = req.id;

  const jobs = await Job.find({ created_by: adminId })
    .populate("company")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    jobs: jobs || [],
  });
};
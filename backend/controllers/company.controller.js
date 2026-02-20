import { Company } from "../models/company.model.js";
import cloudinary from "../utils/Cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import ExpressError from "../utils/ExpressError.js";


// --------------------- REGISTER COMPANY ---------------------
export const registerCompany = async (req, res) => {
  const { companyName } = req.body;

  if (!companyName?.trim()) {
    throw new ExpressError(400, "Company name is required.");
  }

  const existingCompany = await Company.findOne({ name: companyName.trim() });
  if (existingCompany) {
    throw new ExpressError(409, "You can't register the same company.");
  }

  const company = await Company.create({
    name: companyName.trim(),
    userId: req.id,
  });

  res.status(201).json({
    success: true,
    message: "Company registered successfully.",
    company,
  });
};

// --------------------- GET ALL COMPANIES OF USER ---------------------
export const getCompany = async (req, res) => {
  const companies = await Company.find({ userId: req.id });

  return res.status(200).json({
    success: true,
    companies: companies || [],
  });
};

// --------------------- GET COMPANY BY ID ---------------------
export const getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    throw new ExpressError(404, "Company not found.");
  }

  res.status(200).json({
    success: true,
    company,
  });
};

// --------------------- UPDATE COMPANY ---------------------
export const updateCompany = async (req, res) => {
  const { name, description, website, location } = req.body;
  const file = req.file;

  const updateData = { name, description, website, location };

  if (file) {
    // Validate file type & size
    if (!file.mimetype.startsWith("image/")) {
      throw new ExpressError(400, "Only image files are allowed for logo.");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new ExpressError(400, "File too large. Max size 5MB.");
    }

    const fileUri = getDataUri(file);
    const cloudRes = await cloudinary.uploader.upload(fileUri.content, {
      folder: "company_logos",
      use_filename: true,
    });

    updateData.logo = cloudRes.secure_url;
  }

  const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  if (!company) {
    throw new ExpressError(404, "Company not found.");
  }

  res.status(200).json({
    success: true,
    message: "Company information updated successfully.",
    company,
  });
};

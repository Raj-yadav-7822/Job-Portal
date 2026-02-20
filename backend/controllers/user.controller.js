import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/Cloudinary.js";
import ExpressError from "../utils/ExpressError.js";

// ENV CHECK
if (!process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY missing in environment variables");
}

// ---------------- HELPERS ----------------

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (password) => password.length >= 6;

const safeUpload = async (file, folder = "profiles") => {
  if (!file) return "";

  if (
    !file.mimetype.startsWith("image/") &&
    file.mimetype !== "application/pdf"
  ) {
    throw new ExpressError(400, "Only images or PDF allowed");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new ExpressError(400, "File size must be under 5MB");
  }

  const fileUri = getDataUri(file);

  try {
    const uploadRes = await cloudinary.uploader.upload(fileUri.content, {
      folder,
      resource_type: "auto",
    });

    return uploadRes.secure_url;
  } catch (err) {
    throw new ExpressError(500, "File upload failed");
  }
};

// ---------------- REGISTER ----------------

export const register = async (req, res) => {
  const { fullname, email, password, phoneNumber, role } = req.body;

  if (!fullname || !email || !password || !phoneNumber || !role) {
    throw new ExpressError(400, "All fields required");
  }

  if (!isValidEmail(email)) {
    throw new ExpressError(400, "Invalid email");
  }

  if (!isStrongPassword(password)) {
    throw new ExpressError(400, "Password must be 6+ chars");
  }

  const exists = await User.findOne({ email });

  if (exists) {
    throw new ExpressError(409, "Email already exists");
  }

  const profilePhoto = req.file ? await safeUpload(req.file) : "";

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    fullname: fullname.trim(),

    email: email.toLowerCase(),

    phoneNumber,

    password: hashedPassword,

    role,

    profile: {
      profilePhoto,
    },
  });

  res.status(201).json({
    success: true,

    message: "User created",
  });
};

// ---------------- LOGIN ----------------

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new ExpressError(400, "Missing credentials");
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new ExpressError(401, "Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ExpressError(401, "Invalid credentials");
  }

  if (role !== user.role) {
    throw new ExpressError(403, "Unauthorized role");
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },

    process.env.SECRET_KEY,

    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,

    secure: true,

    sameSite: "none",

    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,

    message: "Login success",

    user: {
      _id: user._id,

      fullname: user.fullname,

      email: user.email,

      phoneNumber: user.phoneNumber,

      role: user.role,

      profile: user.profile,
    },
  });
};

// ---------------- LOGOUT ----------------

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,

    message: "Logged out",
  });
};

// ---------------- UPDATE PROFILE ----------------

export const updateProfile = async (req, res) => {
  const { fullname, email, phoneNumber, bio, skills } = req.body;

  const userId = req.id;

  const user = await User.findById(userId);

  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  if (fullname) user.fullname = fullname.trim();

  if (email) {
    if (!isValidEmail(email)) {
      throw new ExpressError(400, "Invalid email");
    }

    const exists = await User.findOne({
      email,
    });

    if (exists && exists._id.toString() !== userId) {
      throw new ExpressError(409, "Email already used");
    }

    user.email = email.toLowerCase();
  }

  if (phoneNumber) user.phoneNumber = phoneNumber;

  if (bio) user.profile.bio = bio;

  if (skills) user.profile.skills = skills.split(",").map((s) => s.trim());

  if (req.file) {
    const url = await safeUpload(req.file);

    user.profile.resume = url;

    user.profile.resumeOriginalName = req.file.originalname;
  }

  await user.save();

  res.status(200).json({
    success: true,

    message: "Profile updated",

    user,
  });
};

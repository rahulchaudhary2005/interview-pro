import express from "express";

import multer from "multer";

import {
  parseResumeController,
} from "../controllers/resume.controller.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/parse",
  upload.single("resume"),
  parseResumeController
);

export default router;
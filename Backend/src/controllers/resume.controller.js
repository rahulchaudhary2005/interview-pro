import fs from "fs";

import pdfParse from "pdf-parse/lib/pdf-parse.js";

export const parseResumeController = async (
  req,
  res
) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "Resume file required",
      });
    }

    const dataBuffer =
      fs.readFileSync(req.file.path);

   const pdfData = await pdfParse(dataBuffer);

    return res.status(200).json({
      text: pdfData.text,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Resume parsing failed",
      error: error.message,
    });
  }
};
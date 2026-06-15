import express from "express";
import multer from "multer";
import fs from "fs";
import { PDFParse } from "pdf-parse";

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

function parseAmount(value) {
  if (!value) return 0;

  return Number(
    value
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .trim()
  );
}

function extractForm16Data(text) {
  const employer =
    text.match(
      /Name and address of the Employer[\s\S]*?\n([A-Z\s&().\-]+?)\n/i
    )?.[1]
      ?.replace(/\s+/g, " ")
      ?.trim() || "";

  const assessmentYear =
    text.match(
      /Assessment Year\s*([\d-]+)/i
    )?.[1] || "";

  const grossSalary =
    parseAmount(
      text.match(
        /1\.\s*Gross Salary[\s\S]*?Total\s*₹([\d,]+\.\d+)/i
      )?.[1]
    );

  const taxableIncome =
    parseAmount(
      text.match(
        /Total taxable income.*?₹([\d,]+\.\d+)/i
      )?.[1]
    );

  const taxPayable =
    parseAmount(
      text.match(
        /Net Tax payable.*?₹([\d,]+\.\d+)/i
      )?.[1]
    );

  return {
    employer,
    assessmentYear,
    grossSalary,
    taxableIncome,
    tds: taxPayable
  };
}



router.post(
  "/upload",
  upload.single("file"),

  async (req, res) => {

    try {

      const buffer =
        fs.readFileSync(
          req.file.path
        );

      const parser =
        new PDFParse({
          data: buffer
        });

      const pdf =
        await parser.getText();

      const data =
        extractForm16Data(
          pdf.text
        );

      await parser.destroy();

      res.json({

        success:true,

        data

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        error:error.message

      });

    }

  }
);

export default router;
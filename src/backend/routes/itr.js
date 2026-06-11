import express from "express";
import multer from "multer";
import fs from "fs";
import { PDFParse } from "pdf-parse";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});
function extractSalary(text){

const match = text.match(
/Gross Salary\s*([\d,]+)/i
);


return match
?
Number(
match[1].replace(/,/g,"")
)
:
0;

}



function extractTDS(text){


const match = text.match(
/TDS\s*([\d,]+)/i
);


return match
?
Number(
match[1].replace(/,/g,"")
)
:
0;


}



function extractEmployer(text){


const match = text.match(
/Employer\s*:\s*(.*)/i
);


return match
?
match[1]
:
"Not found";


}
router.post(
  "/upload",

  upload.single("file"),

  async (req, res) => {
    try {
      const fileBuffer = fs.readFileSync(req.file.path);

      const parser = new PDFParse({
        data: fileBuffer,
      });

      const pdfData = await parser.getText();
      console.log("pdfData", pdfData);
     const text = pdfData.text;



res.json({

message:"PDF extracted successfully",

file:req.file.originalname,


data:{

salary: extractSalary(text),

tds: extractTDS(text),

employer: extractEmployer(text)

}


});

      await parser.destroy();
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: error.message,
      });
    }
  },
);

export default router;

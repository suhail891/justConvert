const fs=require('fs');
const { PDFDocument, rgb } = require('pdf-lib')


const mergePdfService=async (filesPath,outPath)=>{
    try{
        const pdfDoc=await PDFDocument.create();

        for(const filePath of filesPath){
            const pdfBytes=await fs.promises.readFile(filePath);
            const pdf=await PDFDocument.load(pdfBytes);
            const copiedPages=await pdfDoc.copyPages(pdf,pdf.getPageIndices());
            copiedPages.forEach((page)=>{
                pdfDoc.addPage(page);
            })
        }
        const pdfBytes=await pdfDoc.save();
        await fs.promises.writeFile(outPath, pdfBytes);
        return outPath;
    }catch(err){
        console.log("error in pdf merging");
        throw new Error("Error in merging PDFs");
    }
}
module.exports={
    mergePdfService
}
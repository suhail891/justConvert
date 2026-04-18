const {imageToPfdService}=require('../services/pdfService');


const imageToPdfController=async (req,res)=>{
    console.log(req.files)
    console.log("error yha ka bad hai")
    // const filePath=req.files[0].path;
    const filePath=req.files.map(file=>file.path);
    //const filePath = req.files[0].path;
    console.log("its okay",filePath);
   const outputPath = `temp/output-${Date.now()}.pdf`;
   console.log("request is goes to service layer")// debugging log

    const pdf = await imageToPfdService(filePath, outputPath);
    console.log("download pdf is running succesfully")
   // res.download(pdf)
   res.sendFile(pdf,{ root: '.' }, );
}

module.exports={
    imageToPdfController
}
const pdfMergeService = require('../services/pdfMerge.Service');
const path=require('path')

const mergePdfController = async (req, res) => {
    try{
        //yha pr mai path generate krunga jaha pr mai file save krunga
        const filesPath = req.files.map(file => file.path);
        const outputPath = `temp/output-${Date.now()}.pdf`;
        const mergedpdf= await pdfMergeService(filesPath,outputPath);
        console.log("files are merged success fully")

    }catch(err){
        console.log("error in pdf merging");
        res.status(500).json({
            message: err.message
        })
    }
}
module.exports={
    mergePdfController
}
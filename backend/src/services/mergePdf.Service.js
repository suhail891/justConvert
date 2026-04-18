const fs=require('fs');
const {PDFDocument}=require('pdf-lib');


const mergePdfService=async (filesPath,outPath)=>{
    try{

    }catch(err){
        console.log("error in pdf merging");
        res.status(500).json({
            message: err.me
        })

    }
}
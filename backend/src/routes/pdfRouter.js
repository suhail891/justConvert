const express=require('express');
const {upload}=require("../middlewares/uploadMiddleware")
const {imageToPdfController}=require("../controllers/pdfController")

const router=express.Router();


router.post('/image-to-pdf',upload.array("file"), imageToPdfController);

module.exports=router;
const express=require('express');
const {upload}=require("../middlewares/uploadMiddleware")
const {imageToPdfController}=require("../controllers/imageToPdfController")
const  {mergePdfController}=require('../controllers/pdfMerge.Controller');

const router=express.Router();


router.post('/image-to-pdf',upload.array("file"), imageToPdfController);
router.post('/merge',upload.array("pdfs"), mergePdfController);


module.exports=router;
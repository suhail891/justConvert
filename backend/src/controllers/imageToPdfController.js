const { imageToPfdService } = require('../services/imageToPdfService');
const path = require('path');
const fs = require('fs');



const imageToPdfController = async (req, res) => {
    console.log(req.files)
    console.log("error yha ka bad hai")
    // const filePath=req.files[0].path;
    const filePath = req.files.map(file => file.path);
    //const filePath = req.files[0].path;
    console.log("its okay", filePath);
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }


    const outputPath = path.join(tempDir, `output-${Date.now()}.pdf`);
    console.log("request is goes to service layer")// debugging log

    const pdf = await imageToPfdService(filePath, outputPath);
    console.log("download pdf is running succesfully")
    res.download(pdf)
    //    res.sendFile(pdf,{ root: '.' }, );
}

module.exports = {
    imageToPdfController
}
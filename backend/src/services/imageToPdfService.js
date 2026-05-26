const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib')

const imageToPfdService = async (filePath, outputPath) => {
    //read the image file Synchronously
    //const image= await fs.promises.readFile(filePath);

    //create a new pdf document
    const pdfDoc = await PDFDocument.create();

    for (const file of filePath) {
        const image = await fs.promises.readFile(file)
        //add a new page to the pdf documnet with the dimension(400x400)
        const page = pdfDoc.addPage([400, 400]);

        //embbed the image into the pdf document
        const imageEmbed = await pdfDoc.embedJpg(image);

        //scale the image to fit with in the page dimension while presreving aspect ratio
        const { width, height } = imageEmbed.scaleToFit(
            page.getWidth(),
            page.getHeight()
        )

        //draw the image on the pdf page
        page.drawImage(imageEmbed, {
            x: page.getWidth() / 2 - width / 2, // Center the image horizontally.
            y: page.getHeight() / 2 - height / 2, // Center the image vertically.
            width,
            height,
            color: rgb(0, 0, 0), // Set the image color to black.
        });
         
    }

   //save pdf document as byte
         const pdfBytes = await pdfDoc.save();
         
    //write the pdf byte to a file asynchronously
    await fs.promises.writeFile(outputPath, pdfBytes);
    console.log("service running successfully", outputPath)

    return outputPath;
}

module.exports = {
    imageToPfdService
}
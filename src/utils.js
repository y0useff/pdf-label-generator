const fs = require('fs')
const {PDFDocument, PageSizes, degrees} = require('pdf-lib')
const Jimp = require("jimp");
const { text } = require('pdfkit');
// const {ipcMain} = require('electron')

const finalLabelInfo = {
    description: "",
    SKU: "",
    batch_numbers: "",
    roll_numbers: ""

}


// ipcMain.on('set-sheet-row', (event, option) => {
//     finalLabelInfo.description = option["Description"]
//     finalLabelInfo.sku = option["SKU"]
// })


// ipcMain.on('set-batch-number', (event, batchNumber) => {
//     finalLabelInfo.batch_number = batchNumber
// })

// ipcMain.on('set-rolls', (event, option) => {
//     finalLabelInfo.rolls = option
// })

// ipcMain.on('set-labels', (event, option) => {
//     finalLabelInfo.rolls = option
// })



async function writeOverTemplate(templateType) {
    
    const image = await Jimp.default.read(`C:/Users/Yousef/Desktop/Programming/pdf-label-generator/templates/template-${templateType}.png`)
    Jimp.loadFont(Jimp.FONT_SANS_12_BLACK).then(async (font) => {
        // load font from .fnt file

        
        const description = finalLabelInfo.description;
        image.print(font, 105, 2, description); // print description on template

        const SKU = finalLabelInfo.SKU;
        image.print(font, 50, 35, SKU)

        const batchNumber = finalLabelInfo.batch_numbers
        image.print(font, 80, 75, batchNumber)

        const rollNumbers = finalLabelInfo.roll_numbers
        image.print(font, 65, 112, rollNumbers)


        await image.writeAsync(`templates/template-${templateType}-new.png`)
      });
      return image;
}
// writeOverTemplate();

writeOverTemplate('a');

async function run() {
    const pngImageBytes = fs.readFileSync('templates/template-a.png')
    

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()

    // Embed the JPG image bytes and PNG image bytes
    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    // Add a blank page to the document
    const page = pdfDoc.addPage([145,290])




// Draw the PNG image near the lower right corner of the JPG image
page.drawImage(pngImage,{
    width: page.getWidth(),
    height: page.getHeight(),
    x: 0,
    y: 0,
})

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

// For example, `pdfBytes` can be:
//   • Written to a file in Node
//   • Downloaded from the browser
//   • Rendered in an <iframe>

    fs. writeFileSync('./label.pdf', pdfBytes)
}
run()
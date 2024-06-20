const fs = require('fs')
const {PDFDocument, PageSizes, degrees} = require('pdf-lib')
const Jimp = require("jimp");
const { text } = require('pdfkit');
// const {ipcMain} = require('electron')

const { createCanvas, loadImage } = require('canvas')

const finalLabelInfo = {
    description: "poop",
    SKU: "fuck",
    batch_numbers: "shit",
    roll_numbers: "pop"

}

ipcMain.on('set-sheet-row', (event, option) => {

    finalLabelInfo.description = option["Description"]
    finalLabelInfo.sku = option["SKU"]
})


ipcMain.on('set-batch-number', (event, batchNumber) => {
    finalLabelInfo.batch_number = batchNumber
})

ipcMain.on('set-rolls', (event, option) => {
    finalLabelInfo.rolls = option
})

ipcMain.on('set-labels', (event, option) => {
    finalLabelInfo.rolls = option
})

// ipcMain.on('')



async function writeOverTemplate(templateType) {

    const canvas = createCanvas(400, 200)
    const ctx = canvas.getContext('2d')

    loadImage('templates/template-a.png').then((image) => {
        ctx.drawImage(image, 0, 0)
        ctx.font = '12px Impact'


    
    // const image = await Jimp.default.read(`C:/Users/Yousef/Desktop/Programming/pdf-label-generator/templates/template-${templateType}.png`)
    // Jimp.loadFont(Jimp.FONT_SANS_12_BLACK).then(async (font) => {
    //     // load font from .fnt file

        
        const description = finalLabelInfo.description;
        ctx.fillText(description, 105, 2); // print description on template

        const SKU = finalLabelInfo.SKU;
        ctx.fillText(SKU, 50, 35)

        const batchNumber = finalLabelInfo.batch_numbers
        ctx.fillText(batchNumber, 80, 75)

        const rollNumbers = finalLabelInfo.roll_numbers
        ctx.fillText(rollNumbers, 65, 112)


    //     await image.writeAsync(`templates/template-${templateType}-new.png`)
    //   });
    //   return image;
    const el = '<img src="' + canvas.toDataURL() + '" />'
    console.log(el)
    return el;
    })

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
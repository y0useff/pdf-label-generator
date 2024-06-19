const fs = require('fs')
const {PDFDocument, PageSizes, degrees} = require('pdf-lib')
const Jimp =require("jimp");



async function writeOverTemplate() {
    Jimp.loadFont('templates/WzwUUSWoTd2ndu9WpS4JINJN.TTF_0.fnt').then(async (font) => {
        // load font from .fnt file
        const image = await Jimp.read('templates/template-a.png')
        const message = "asddgsfsdgfsgdfsgdfdfggdfssgdfsdgfsgdsgdfsdfgsdfdgsfsdgfdgfsdfgdgsff"
        image.print(font, 0, 0, message); // print a message on an image. message can be a any type
        await image.writeAsync('templates/template-a-new.png')
      });
}
writeOverTemplate();


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

fs.writeFileSync('./label.pdf', pdfBytes)
}

run()
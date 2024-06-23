const fs = require('fs')
const {PDFDocument, degrees} = require('pdf-lib')
const {ipcMain} = require('electron')
const e = require('express')

const finalLabelInfo = {
    description: `8911 RY 39.75"x10,000 Ft. Roll`,
    SKU: "",
    batch_numbers: "",
    roll_numbers: ""
}

// ipcMain.handle('preview-pdf', embedImageIntoPDF(finalLabelInfo))

async function embedImageIntoPDF(finalLabelInfo) {

    const pngImageBytes = await fs.readFileSync('/Users/yousefghaly/Desktop/Programming/pdf-label-generator/pdf-label-generator/templates/template-a.png', {encoding: 'base64'})

    const pdfDoc = await PDFDocument.create()

    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    const page = pdfDoc.addPage([290,145])

    page.drawImage(pngImage, {
        width: 290,
        height: 145
    })

    page.drawText(finalLabelInfo.description, {
        size: 8,
        x: 80,
        y: 130,
    })

    page.drawText(finalLabelInfo.SKU, {
        size: 12,
        x: 40,
        y: 108,
    })

    page.drawText(finalLabelInfo.batch_numbers, {
        size: 12,
        x: 60,
        y: 78,
    })

    page.drawText(finalLabelInfo.roll_numbers, {
        size: 12,
        x: 45,
        y: 50,
    })

    const pdfBytes = await pdfDoc.save()

    await fs.writeFileSync('./label.pdf', pdfBytes)

    return `<iframe src=${await pdfDoc.saveAsBase64({dataUri: true})}> </iframe>`
    
}

ipcMain.on('set-sheet-row', (event, option) => {
    finalLabelInfo.description = option["Description"]
    finalLabelInfo.SKU = option["SKU"]
    embedImageIntoPDF(finalLabelInfo)
})


ipcMain.on('set-batch-number', (event, batchNumber) => {
    finalLabelInfo.batch_numbers = batchNumber
    embedImageIntoPDF(finalLabelInfo)
})

ipcMain.on('set-rolls', (event, option) => {
    finalLabelInfo.roll_numbers = option
    embedImageIntoPDF(finalLabelInfo)
})

ipcMain.on('set-labels', (event, option) => {
    finalLabelInfo.labels = option
    embedImageIntoPDF(finalLabelInfo)
})



// async function writeOverTemplate(templateType) {
    
    

// }
// // writeOverTemplate();

// writeOverTemplate('a');

// async function run() {
//     // const pngImageBytes = fs.readFileSync('templates/template-a.png')
    

//     // Create a new PDFDocument
//     const pdfDoc = await PDFDocument.create()

//     // Embed the JPG image bytes and PNG image bytes
//     const pngImage = await pdfDoc.embedPng(pngImageBytes)

//     // Add a blank page to the document
//     const page = pdfDoc.addPage([145,290])




// // Draw the PNG image near the lower right corner of the JPG image
// page.drawImage(pngImage,{
//     width: page.getWidth(),
//     height: page.getHeight(),
//     x: 0,
//     y: 0,
// })

// // Serialize the PDFDocument to bytes (a Uint8Array)
// const pdfBytes = await pdfDoc.save()

// // For example, `pdfBytes` can be:
// //   • Written to a file in Node
// //   • Downloaded from the browser
// //   • Rendered in an <iframe>

//     fs. writeFileSync('./label.pdf', pdfBytes)
// }
// // run()
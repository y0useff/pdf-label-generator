const fs = require('fs')
const {PDFDocument, degrees} = require('pdf-lib')
const {ipcMain, dialog,BrowserWindow} = require('electron')
const e = require('express')
const PDFWindow = require('electron-pdf-window-s').default

const finalLabelInfo = {
    description: `8911 RY 39.75"x10,000 Ft. Roll`,
    SKU: "adsfasdfd",
    batch_number: "23222",
    number_of_rolls: "10",
    labels: "5",
    template_style: "a"
}


// getPrinters()
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

    // const printerOptions = {

    // }


    // ipcMain.handle('get-printers', async (event) => {
    //     const printers = await getPrinters()
    //     const printerNames = []
    //     for (let printer of printers) {
    //         printerNames.push(printer.name)
    //     }
    //     return printerNames;
    // })

    // generateFullPDF('./templates/label.pdf')




//generates
ipcMain.handle('generate-pdf', generateFullPDF)


async function generateFullPDF() {

    const savePath = "./templates/label.pdf"

    const pngImageBytes = await fs.readFileSync(`./templates/template-${finalLabelInfo.template_style}.png`, {encoding: 'base64'})

    const pdfDoc = await PDFDocument.create()

    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    console.log(finalLabelInfo)


    //for every roll
    for (let i = 1; i <= parseInt(finalLabelInfo.number_of_rolls); i++) {
        //for every label wtihin the roll
        for (let j= 1; j<= parseInt(finalLabelInfo.labels); j++) {
            const page = pdfDoc.addPage([290,145]) //add a page (1 label)
            page.drawImage(pngImage, {
                width: 290,
                height: 145
            }) //draw the template

            //draw infomration, if template style is a.
            if (finalLabelInfo.template_style == 'A') {
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
            
                page.drawText(finalLabelInfo.batch_number, {
                    size: 12,
                    x: 60,
                    y: 78,
                })
            
                page.drawText(i.toString(), {
                    size: 12,
                    x: 45,
                    y: 50,
                })
            }
        }
    }
    const pdfBytes = await pdfDoc.saveAsBase64({dataUri: true})
    //current electron version has issues with pdf display and after 12 hours this was the solution i figured out
    await fs.writeFileSync("./templates/label-preview.html", `
        <html>
        <head> </head>
        
            <body>
                  <script>
                        var objFra = document.createElement('iframe'); // Create an IFrame.
                        objFra.width = "600px"
                        objFra.height = "300px"
                        objFra.align = "center"
                        objFra.id = "pdfview"
                        objFra.src = "${pdfBytes}"; // Set source not done .pdf.
                        objFra.onload = function(){
                            objFra.contentWindow.focus(); // Set focus.
                            objFra.contentWindow.print(); // Print it  
                        };
                        document.body.appendChild(objFra); // Add the frame to the web page.
                    </script>
            </body>
        </html>
    `)
    //inject an html file with an embedded js script that will embed an iframe with the base64 url
    //and then proceed to use front end js code to print the contents of the browser
    //dont fucking touch any of it 

    const pdfWin = new BrowserWindow({
        width: 800,
        height: 600,

      });
    
      
      pdfWin.loadURL("C:/Users/Yousef/Desktop/Programming/pdf-label-generator/templates/label-preview.html");
    
      // Open the DevTools.
      pdfWin.webContents.openDevTools();

    return pdfBytes;
}


    ipcMain.handle('preview-pdf', embedImageIntoPDF)

    //sets description, sku, and template style from row
    ipcMain.on('set-sheet-row', (event, option) => {
        finalLabelInfo.description = option["Description"]
        finalLabelInfo.SKU = option["SKU"]
        finalLabelInfo.template_style = option["Template Style"]
    })


    ipcMain.on('set-batch-number', (event, batchNumber) => {
        finalLabelInfo.batch_number = batchNumber
    })

    ipcMain.on('set-rolls', (event, option) => {
        finalLabelInfo.number_of_rolls = option
    })

    ipcMain.on('set-labels', (event, option) => {
        finalLabelInfo.labels = option
    })


async function embedImageIntoPDF() {


    const pngImageBytes = await fs.readFileSync(`./templates/template-${finalLabelInfo.template_style}.png`, {encoding: 'base64'})

    const pdfDoc = await PDFDocument.create()

    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    const page = pdfDoc.addPage([290,145])

    console.log(finalLabelInfo)

    page.drawImage(pngImage, {
        width: 290,
        height: 145
    })
    //for template a
    if (finalLabelInfo.template_style == 'A') {
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
    
        page.drawText(finalLabelInfo.batch_number, {
            size: 12,
            x: 60,
            y: 78,
        })
    
        page.drawText(finalLabelInfo.number_of_rolls, {
            size: 12,
            x: 45,
            y: 50,
        })
    }
    

    const pdfBytes = await pdfDoc.saveAsBase64({dataUri: true})

    await fs.writeFileSync('./templates/label-preview.pdf', pdfBytes)

    return pdfBytes
    
}





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
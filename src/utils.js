const fs = require('fs')
const {PDFDocument, } = require('pdf-lib')
const {ipcMain,BrowserWindow, app} = require('electron')
const fontkit = require('@btielen/pdf-lib-fontkit')
const path = require('path');
// const slash = require('slash');

// app.disableHardwareAcceleration()

const finalLabelInfo = {
    description: ``,
    SKU: "",
    batch_number: "",
    number_of_rolls: "",
    labels: "",
    template_style: ""
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




// async function generateFullPDF() {


//     const pngImageBytes = fs.readFileSync(`./templates/template-${finalLabelInfo.template_style}.png`)
//     const pdfDoc = await PDFDocument.create()

//     const pngImage = await pdfDoc.embedPng(pngImageBytes)


//     const fontBytes = await fs.readFileSync('C:/Windows/Fonts/arialbd.ttf')
//     pdfDoc.registerFontkit(fontkit);
//     const arialFont = await pdfDoc.embedFont(fontBytes);

    
//     console.log(finalLabelInfo)

//     //for every roll
//     for (let i = 1; i <= parseInt(finalLabelInfo.number_of_rolls); i++) {
//         //for every label wtihin the roll
//         for (let j= 1; j<= parseInt(finalLabelInfo.labels); j++) {
//             if (finalLabelInfo.template_style == 'A') {
//             const page = pdfDoc.addPage([330,165]) //add a page (1 label)
//             page.drawImage(pngImage, {
//                 width: 330,
//                 height: 165,
//                 y: -20
//             }) //draw the template

//             //draw infomration, if template style is a.
            
//                 page.drawText(finalLabelInfo.description, {
//                     x: 7 ,
//                     y: 140,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(finalLabelInfo.SKU, {
//                     x: 7 ,
//                     y: 105,
//                     font: arialFont,
//                     size: 14

//                 })
            
//                 page.drawText(finalLabelInfo.batch_number, {
//                     x: 63 ,
//                     y: 69,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(i.toString(), {
//                     x: 50,
//                     y: 41,
//                     font: arialFont,
//                     size: 14
//                 })
//             }

//             if (finalLabelInfo.template_style == "B") {
//                 const page = pdfDoc.addPage([330,165]) //add a page (1 label)
//                 page.drawImage(pngImage, {
//                     width: 330,
//                     height: 165,         
//                 })
//                 page.drawText(finalLabelInfo.description, {
//                     x: 8 ,
//                     y: 145,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(finalLabelInfo.SKU, {
//                     x: 8,
//                     y: 125,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(finalLabelInfo.batch_number, {
//                     x: 65,
//                     y: 102,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(i.toString(), {
//                     x: 50,
//                     y: 85,
//                     font: arialFont,
//                     size: 14
//                 })
//             }
        
//             if (finalLabelInfo.template_style == "C") {
//                 const page = pdfDoc.addPage([330,165]) //add a page (1 label)
//                 page.drawImage(pngImage, {
//                     width: 330,
//                     height: 165,                    
//                 })
//                 page.drawText(finalLabelInfo.description, {
//                     x: 8,
//                     y: 140,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(finalLabelInfo.SKU, {
//                     x: 8,
//                     y: 105,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(finalLabelInfo.batch_number, {
//                     x: 65,
//                     y: 68,
//                     font: arialFont,
//                     size: 14
//                 })
            
//                 page.drawText(i.toString(), {
//                     x: 50,
//                     y: 36,
//                     font: arialFont,
//                     size: 14
//                 })
//             }
//         }
//     }
//     const pdfBytes = await pdfDoc.save()
//     const pdfLocation = `${process.resourcesPath}/fully_generated.pdf`
//     await fs.writeFileSync(pdfLocation, pdfBytes)
//     //current electron version has issues with pdf display and after 12 hours this was the solution i figured out
//     //await fs.writeFileSync(`${process.resourcesPath}/templates.label-preview.html`, `
//     // console.log(pdfLocation)
//     // let convertPath = (windowsPath) => windowsPath.replace(/^\\\\\?\\/,"").replace(/\\/g,'\/').replace(/\/\/+/g,'\/')
//     // console.log("****************************")
//     // console.log(convertPath(pdfLocation))
//     // await fs.writeFileSync(`${process.resourcesPath}/templates.label-preview.html`, `
//     // <html>
//     //     <head> </head>
        
//     //         <body>
//     //               <script>
//     //                     var objFra = document.createElement('iframe');
//     //                     objFra.width = "600px"
//     //                     objFra.height = "300px"
//     //                     objFra.align = "center"
//     //                     objFra.id = "pdfview"
//     //                     objFra.src = "${convertPath(pdfLocation)}"; 
//     //                     objFra.onload = function(){
//     //                         objFra.contentWindow.focus();
//     //                         objFra.contentWindow.print();
//     //                     };
//     //                     document.body.appendChild(objFra);
//     //                 </script>
//     //         </body>
//     //     </html>
//     // `)
//     //inject an html file with an embedded js script that will embed an iframe with the base64 url
//     //and then proceed to use front end js code to print the contents of the browser
//     //dont fucking touch any of it 

//     const pdfWin = new BrowserWindow({
//         width: 800,
//         height: 600,

//     });
//     // pdfWin.webContents.openDevTools()

//     await pdfWin.loadURL(pdfLocation);
      
//     //   //FIX GENERATION BUG
// }

// const fs = require('fs');
// const { PDFDocument, rgb } = require('pdf-lib');
// const fontkit = require('@pdf-lib/fontkit');
// const { BrowserWindow } = require('electron');

async function generatePDF() {
    try {
        const [pngImageBytes, fontBytes] = await Promise.all([
            fs.promises.readFile(`./templates/template-${finalLabelInfo.template_style}.png`),
            fs.promises.readFile('C:/Windows/Fonts/arialbd.ttf')
        ]);

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);
        
        const [pngImage, arialFont] = await Promise.all([
            pdfDoc.embedPng(pngImageBytes),
            pdfDoc.embedFont(fontBytes)
        ]);

        const drawText = (page, text, x, y) => {
            page.drawText(text, {
                x,
                y,
                font: arialFont,
                size: 14
            });
        };

        for (let i = 1; i <= parseInt(finalLabelInfo.number_of_rolls); i++) {
            for (let j = 1; j <= parseInt(finalLabelInfo.labels); j++) {
                const page = pdfDoc.addPage([330, 165]);
                page.drawImage(pngImage, {
                    width: 330,
                    height: 165,
                    y: finalLabelInfo.template_style === 'A' ? -20 : 0
                });

                drawText(page, finalLabelInfo.description, 7, 140);
                drawText(page, finalLabelInfo.SKU, 7, finalLabelInfo.template_style === 'B' ? 125 : 105);
                drawText(page, finalLabelInfo.batch_number, 63, finalLabelInfo.template_style === 'B' ? 102 : 68);
                drawText(page, i.toString(), 50, finalLabelInfo.template_style === 'B' ? 85 : 36);
            }
        }

        const pdfBytes = await pdfDoc.save();
        const pdfLocation = path.join(process.resourcesPath, 'fully_generated.pdf');
        await fs.promises.writeFile(pdfLocation, pdfBytes);

        const pdfWin = new BrowserWindow({
            width: 800,
            height: 600
        });

        await pdfWin.loadFile(pdfLocation);

    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

// // Usage example:
// const finalLabelInfo = {
//     template_style: 'A',
//     number_of_rolls: '3',
//     labels: '5',
//     description: 'Sample Description',
//     SKU: '12345',
//     batch_number: '67890'
// };

// generatePDF(finalLabelInfo);



    //generates
    ipcMain.handle('generate-pdf', generatePDF)

    ipcMain.handle('preview-pdf', embedImageIntoPDF)

    //sets description, sku, and template style from row
    ipcMain.on('set-sheet-row', (event, option) => {
        finalLabelInfo.description = option["Description"]
        finalLabelInfo.SKU = option["SKU"]
        finalLabelInfo.template_style = option["Template Style"]
        finalLabelInfo.labels = option["Labels per roll/cut?"]
        console.log("initial info set")
    })


    ipcMain.on('set-batch-number', (event, batchNumber) => {
        finalLabelInfo.batch_number = batchNumber
        console.log("batch # set")
    })

    ipcMain.on('set-rolls', (event, option) => {
        finalLabelInfo.number_of_rolls = option
        console.log("rolls set")
    })



async function embedImageIntoPDF() {


    const pngImageBytes = await fs.readFileSync(`./templates/template-${finalLabelInfo.template_style}.png`, {encoding: 'base64'})

    const pdfDoc = await PDFDocument.create()

    const pngImage = await pdfDoc.embedPng(pngImageBytes)

    const fontBytes = await fs.readFileSync('C:/Windows/Fonts/arialbd.ttf')
    pdfDoc.registerFontkit(fontkit);
    const arialFont = await pdfDoc.embedFont(fontBytes);


    if (finalLabelInfo.template_style == 'A') {
        const page = pdfDoc.addPage([330,165]) //add a page (1 label)
        page.drawImage(pngImage, {
            width: 330,
            height: 165,
            y: -20
        }) //draw the template

        //draw infomration, if template style is a.
        
        page.drawText(finalLabelInfo.description, {
            x: 7 ,
            y: 140,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.SKU, {
            x: 7 ,
            y: 105,
            font: arialFont,
            size: 14

        })
    
        page.drawText(finalLabelInfo.batch_number, {
            x: 63 ,
            y: 69,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.number_of_rolls, {
            x: 50,
            y: 41,
            font: arialFont,
            size: 14
        })
    }
    

    if (finalLabelInfo.template_style == "B") {
        const page = pdfDoc.addPage([330,165]) //add a page (1 label)
        page.drawImage(pngImage, {
            width: 330,
            height: 165,         
        })
        page.drawText(finalLabelInfo.description, {
            x: 8 ,
            y: 145,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.SKU, {
            x: 8,
            y: 125,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.batch_number, {
            x: 65,
            y: 102,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.number_of_rolls, {
            x: 50,
            y: 85,
            font: arialFont,
            size: 14
        })
    }
    
    if (finalLabelInfo.template_style == "C") {
        const page = pdfDoc.addPage([330,165]) //add a page (1 label)
        page.drawImage(pngImage, {
            width: 330,
            height: 165,                    
        })
        page.drawText(finalLabelInfo.description, {
            x: 8,
            y: 140,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.SKU, {
            x: 8,
            y: 105,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.batch_number, {
            x: 65,
            y: 68,
            font: arialFont,
            size: 14
        })
    
        page.drawText(finalLabelInfo.number_of_rolls, {
            x: 50,
            y: 36,
            font: arialFont,
            size: 14
        })
    }
    const b = await pdfDoc.save()
    const pdfBytes = await pdfDoc.saveAsBase64({dataUri: true})

    await fs.writeFileSync('./templates/label-preview.pdf', b)

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
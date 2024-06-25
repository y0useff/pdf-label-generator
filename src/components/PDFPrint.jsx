import * as React from 'react'
import {useState, useEffect} from 'react'



export default function PDFPrint() {
    

    const [iframeData, setiframeData] = useState('')

    
    useEffect(() => {
        getIframe();
      }, []);

    async function getIframe() {
        setiframeData(await window.electronAPI.generatePDF())
    }



    //insert iframe between div
    return(
        <>
            <iframe src={iframeData + `#view=FitH`} ></iframe>
        </>
    )
}
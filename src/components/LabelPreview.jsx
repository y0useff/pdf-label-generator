import * as React from 'react'
import {useState, useEffect} from 'react'



export default function LabelPreview() {

    const [iframeData, setiframeData] = useState('')

    
    useEffect(() => {
        getIframe();
      }, []);

    async function getIframe() {
        setiframeData(await window.electronAPI.previewPDF())
    }



    //insert iframe between div
    return(
        <>
            <iframe src={iframeData + `#view=FitH`} ></iframe>
        </>
    )
}
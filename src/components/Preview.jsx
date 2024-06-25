import * as React from 'react'
import Button from 'react-bootstrap/Button';
import { createRoot } from 'react-dom/client';
import LabelPreview from './LabelPreview.jsx'




export default function Preview() {

    

    //ipc renderer to a utility function that previews the pdf kit
    // const path = await window.electronAPI.previewPDF()
    // console.log(path)
    return (
        <>
        <Button onClick={() =>{
            const labelNode = window.document.getElementById("labelPreview")
            const labelNodeRoot = createRoot(labelNode);
            labelNodeRoot.render(<LabelPreview />);
        }} id="preview" action variant="primary">Preview</Button>{' '}
        </>
    )
}
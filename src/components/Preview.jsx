import * as React from 'react'
import Button from 'react-bootstrap/Button';

function previewLabel() {

}

export default function Preview() {

    //ipc renderer to a utility function that previews the pdf kit
    // const path = await window.electronAPI.previewPDF()
    // console.log(path)
    return (
        <>
        <Button action onClick={previewLabel} variant="primary">Preview</Button>{' '}
        </>
    )
}
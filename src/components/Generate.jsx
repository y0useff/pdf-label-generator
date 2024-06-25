import * as React from 'react'
import Button from 'react-bootstrap/Button';
// import { dialog }  from 'electron'



export default function Generate() {

    // const [pdfData, setpdfData] = useState('')

    
    // useEffect(() => {
    //     getPDF();
    //   }, []);

    // async function getPDF() {
    //     setiframeData(await window.electronAPI.generatePDF())
    // }

    return(
        <>
            <Button onClick={() => {
                window.electronAPI.generatePDF()
            }}id="generate" action variant="success">Generate</Button>{' '}
        </>
    )

}
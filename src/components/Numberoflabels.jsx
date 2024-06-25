import * as React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';


export default function Numberoflabels() {

    const [rolls, setRolls] = useState('')
    const [labels, setLabels] = useState('')

    

    return(
        <Form>
        <Form.Group id="labelGroup">
            <Form.Control value={rolls} onChange={e => {
                setRolls(e.target.value);
                window.electronAPI.setNumberOfRolls(e.target.value)
            }} className="inp" id="rolls" type="text" placeholder='Enter Number of Rolls or Cuts' />
            <br />
            <Form.Control value={"change this so it's grabbed from the sheet.`"} onChange={e => {
                setLabels(e.target.value);
                window.electronAPI.setNumberOfLabels(e.target.value)
            }} className="inp" id="labels" type="text" placeholder='Enter Number of Labels per Roll' disabled />
        </Form.Group>
        </Form> 

    )
}
import * as React from 'react';
import { useState } from 'react';
export default function Numberoflabels() {

    const [rolls, setRolls] = useState('')
    const [labels, setLabels] = useState('')


    

    return(
        <>
        <div id="inputHolder">
            <input value={rolls} onChange={e => {
                setRolls(e.target.value);
                window.electronAPI.setNumberOfRolls(e.target.value)
            }} className="inp" id="rolls" type="text" placeholder='Enter Number of Rolls or Cuts' />
                <br />
                <br />
            <input value={labels} onChange={e => {
                setLabels(e.target.value);
                window.electronAPI.setNumberOfLabels(e.target.value)
            }} className="inp" id="labels" type="text" placeholder='Enter Number of Labels per Roll' />
        </div>
        </>

    )
}
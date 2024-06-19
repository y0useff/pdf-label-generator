import * as React from 'react';
import { useState } from 'react';
export default function Numberoflabels() {

    return(
        <div>
            <input className="inp" id="rolls" type="text" placeholder='Enter Number of Rolls or Cuts' />
            <br></br>
            <br />
            <input className="inp" id="labels" type="text" placeholder='Enter Number of Labels per Roll' />

        </div>
    )
}
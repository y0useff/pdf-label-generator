import * as React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import label_information from '../../label_information.json'

export let selectedObject = {}
import InputGroup from 'react-bootstrap/InputGroup';

let batchNumber = ""

 
export default function Dropdown() {

    let optionsArray = [];
    //Selecting the Description
    for (let i = 0; i < label_information.length; i++) {
        const description = (label_information[i])["Description"]
        const option = {}
        option.value = label_information[i]
        option.label = description
        optionsArray.push(option)
    }

    // console.log(optionsArray)

    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (option) => {
        setSelectedPrefix("")
        setSelectedOption(option);
        let batch_prefixes = ((option.value)["Batch Prefix"]).toString()
        const isMultiple = batch_prefixes.indexOf(',')
        if (isMultiple > 0) {
            //if batch prefix is multiple items
            batch_prefixes = batch_prefixes.split(',')
            alert("enter text here")
        }
        else {
            //if batch prefix isnt multiple items

        }
        selectedObject = option.value;
        selectedObject.batch_prefixes = batch_prefixes;
        

        window.electronAPI.setSheetRow(selectedObject); 
    };

    let batchArray = []

    const [selectedPrefix, setSelectedPrefix] = useState(null);

    const handlePrefixChange = (option) => {
        setSelectedPrefix(option)
        batchNumber = ""
        //=IF(F2<100,C2&D2&"0"&F2,C2&D2&F2)
        
        const julian_date = (selectedObject["Julian Date"])
        batchNumber = batchNumber + option.value + selectedObject["Year (last digit of current year)"];
        if (julian_date < 100 || julian_date == undefined) {
            batchNumber = batchNumber + 0
        }
        batchNumber = batchNumber + julian_date;

        window.electronAPI.setBatchNumber(batchNumber); 

    }
    

    for (let prefix_index in selectedObject.batch_prefixes) {
        const prefix = (selectedObject.batch_prefixes[prefix_index])
        const object = {}
        object.value = prefix
        object.label = prefix
        batchArray.push(object)
    }

    return(
        <div>
            <span> Select Description</span>
            <Select
            className="search-dropdown"
            value={selectedOption}
            onChange={handleChange}
            options={optionsArray}
            description={{selectedOption}}
            />

            <span> Select Batch Prefix(s)</span>
            <Select
            className="search-dropdown"
            value={selectedPrefix}
            onChange={handlePrefixChange}
            options={batchArray}
            />

            <p>Batch Number: {batchNumber}</p>
        </div>
    )
}
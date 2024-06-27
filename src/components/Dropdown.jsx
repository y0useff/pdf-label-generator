import * as React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import julian from 'julian'
import Papa from 'papaparse'

export let selectedObject = {}
import InputGroup from 'react-bootstrap/InputGroup';

let batchNumber = ""

import label_information from '../../data.csv'; 

// const config = {
// 	delimiter: ",",	// auto-detect
// 	newline: "\n",	// auto-detect
// 	quoteChar: `'`,
// 	escapeChar: undefined,
// 	header: false,
// 	transformHeader: undefined,
// 	dynamicTyping: false,
// 	preview: 0,
// 	encoding: "",
// 	worker: false,
// 	comments: false,
// 	step: undefined,
// 	complete: undefined,
// 	error: undefined,
// 	download: false,
// 	downloadRequestHeaders: undefined,
// 	downloadRequestBody: undefined,
// 	skipEmptyLines: false,
// 	chunk: undefined,
// 	chunkSize: undefined,
// 	fastMode: undefined,
// 	beforeFirstChunk: undefined,
// 	withCredentials: undefined,
// 	transform: undefined,
// 	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
// 	skipFirstNLines: 0
// }
// console.log(csv)

// // // const csv_string = csv
// // const results = Papa.parse(csv, config);

// // console.log(results.data)

// // let fileOutputName = '../../label_information.json'

// import  from '../../label_information.json'


 
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

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedPrefix, setSelectedPrefix] = useState("");

    const handleChange = (option) => {
        setSelectedOption(option);
        let batch_prefixes = ((option.value)["Batch Prefix"]).toString()
        const isMultiple = batch_prefixes.indexOf(',')


        if (isMultiple > 0) {
            //if batch prefix is multiple items
            batch_prefixes = batch_prefixes.split(',')  
            selectedObject = option.value;
            selectedObject.batch_prefixes = batch_prefixes;
            handlePrefixChange({})
        }
        else {            
            selectedObject = option.value;
            selectedObject.batch_prefixes = batch_prefixes;
            handlePrefixChange({
                value: batch_prefixes,
                label: batch_prefixes
            })
        }

        window.electronAPI.setNumberOfLabels(((option.value)["Labels per roll/cut?"]).toString())

        window.electronAPI.setSheetRow(selectedObject); 
    };

    let batchArray = []


    const handlePrefixChange = (option) => {
        setSelectedPrefix(option)
        batchNumber = ""
        
        if (option.value == undefined) return window.electronAPI.setBatchNumber(batchNumber);

        let julian_date = 
        ((Math.floor(julian(new Date()))).toString()).substring(2)
        -
        ((Math.floor(julian(new Date(2024, 0, 1)))).toString()).substring(2)


        console.log(julian_date)
        
        // let julian_date = julian(new Date()) - julian(new Date(2024, 0, 1))
        // julian_date = Math.floor(julian_date)
        // julian_date = (julian_date.toString()).substring(2)

        batchNumber = batchNumber + option.value + selectedObject["Year (last digit of current year)"] + julian_date;
        
        // if (julian_date < 100 || julian_date == undefined || julian_date == null) {
        //     batchNumber = batchNumber + 0
        // }


        window.electronAPI.setBatchNumber(batchNumber)

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
            <CreatableSelect
            className="search-dropdown"
            value={selectedPrefix}
            onChange={handlePrefixChange}
            options={batchArray}
            />

            <p>Batch Number: {batchNumber}</p>
        </div>
    )
}
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Dropdown from './components/Dropdown.jsx'
import Numberoflabels from './components/Numberoflabels.jsx'


const searchDescriptionNode = window.document.getElementById("searchDescription")
const searchDescriptionNodeRoot = createRoot(searchDescriptionNode);
searchDescriptionNodeRoot.render(<Dropdown />);

const numberOfLabelsNode = window.document.getElementById("numberOfLabels")
const numberOfLabelsNodeRoot = createRoot(numberOfLabelsNode);
numberOfLabelsNodeRoot.render(<Numberoflabels />)



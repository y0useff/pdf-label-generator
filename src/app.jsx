import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.jsx';
import LabelPreview  from './components/LabelPreview.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';



const headerNode = window.document.getElementById("header")
const headerNodeRoot = createRoot(headerNode);
headerNodeRoot.render(<Header />);

const labelNode = window.document.getElementById("labelPreview")
const labelNodeRoot = createRoot(labelNode);
labelNodeRoot.render(<LabelPreview />);





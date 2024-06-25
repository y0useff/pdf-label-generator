import * as React from 'react';
import { createRoot } from 'react-dom/client';
import ViewPDF from './ViewPDF.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const bodyNode = window.document.getElementById("body")
const bodyNodeRoot = createRoot(bodyNode);
bodyNodeRoot.render(<ViewPDF />);

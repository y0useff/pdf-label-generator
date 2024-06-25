import * as React from 'react';
import { createRoot } from 'react-dom/client';
import PDFPrint from './PDFPrint.jsx'

const node = document.getElementById('body')
const nodeRoot = createRoot(node)
nodeRoot.render(<PDFPrint />)

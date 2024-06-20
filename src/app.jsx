import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';



const headerNode = window.document.getElementById("header")
const headerNodeRoot = createRoot(headerNode);
headerNodeRoot.render(<Header />);






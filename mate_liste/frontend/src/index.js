import App from "./components/App";
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'typeface-roboto';

require('typeface-roboto')

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('app'));
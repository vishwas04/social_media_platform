import React from 'react';
import ReactDOM from 'react-dom';
import './image.css';
import Image from './image';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Image />,
    document.getElementById('root')
);
registerServiceWorker();

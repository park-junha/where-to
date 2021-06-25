import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import App from './components/App/App';

//test
ReactDOM.render(
  <React.StrictMode>
    <App renderVisuals={true} />
  </React.StrictMode>,
  document.getElementById('root')
);

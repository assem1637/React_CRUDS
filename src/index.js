import ReactDom from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import './index.css';
import App from './App';

let root = ReactDom.createRoot(document.getElementById(`root`));
root.render(<App />)
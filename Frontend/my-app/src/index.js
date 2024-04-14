import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="81969083094-t62qafn08p1n6qck8593ot2qe3n4eccb.apps.googleusercontent.com" >
    <BrowserRouter>
     <App/>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>

);



import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutePath from './pages/RoutePath';
import "./Styles/App.scss"
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutePath />
    </BrowserRouter>
  </React.StrictMode>
);



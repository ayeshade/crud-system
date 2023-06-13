import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dashboard from './MyComponent/Dashboard';
import Modal from './MyComponent/modal'
import Article from './MyComponent/article'
import Publisher from './MyComponent/Publisher'

import {

  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App/>,
  // },
  {
    path: "/",
    element: <Dashboard/>,
  },
  {
    path: "modal",
    element: <Modal/>,
  },
  
  {
    path: "article",
    element: <Article/>,
  },
  {
    path: "publisher",
    element: <Publisher/>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Modal from '../MyComponent/modal';
const Dashboard = () => {
  return (
  
    <div className="dashboard-container">
      <div className="menu-container">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/modal">Reporter</Link></li>
          <li><Link to="/article">Article</Link></li>
          <li><Link to="/Publisher">Publisher</Link></li>
        </ul>
      </div>
      {/* <div className="content-container">
        <h1>CRUD APP</h1>
        <div className='container'>
        </div>
        
      </div> */}
    </div>
  
  );
};
export default Dashboard;

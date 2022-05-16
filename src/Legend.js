import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function Legend() {
  return (
    

        <nav
          className="navbar App-header"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            Legend 
            {/* <div clasName = "navbar-item"> Edit </div>
            <div clasName = "navbar-item"> Add Child </div> */}
          </div>

          <div className="navbar-brand">
            <span className="navbar-AddChild">Add Child</span>
          </div>

          <div className="navbar-brand">
            <span className="navbar-AddSibling">Add Sibling</span>
          </div>
          
          <div className="navbar-brand">
           <span className="navbar-Edit">Edit </span>
          </div>
            
          <div className="navbar-brand">
            <span className="navbar-Delete">Delete</span>
          </div>
        </nav>
  );
}

export default Legend;

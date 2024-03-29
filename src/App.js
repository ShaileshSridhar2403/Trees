import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import AllNotes from "./AllNotes";
import NewNote from "./NewNote";
import EditNote from "./EditNote";
// import EditorApp from "./editor/App"
// import EditorComponent from "./editor/editor/editor"
import RichTextEditor from "./ReactQuilComp";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav
          className="navbar App-header"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Trees
            </Link>
          </div>
          
         


          <div className="navbar-end">
            <Link to="/" className="navbar-item">
              All Notes
            </Link>
            

            {/* <Link to="/newnote" className="navbar-item"> */}
            {/* <Link to="/editorapp" className="navbar-item">
              New Note
            </Link> */}
          </div>
        </nav>

        <Route exact path="/" component={AllNotes} />
        {/* <Route path="/newnote" component={NewNote} /> */}
        {/* <Route path="note/:id" component={RichTextEditor} /> */}
        <Route path="/editorapp" component={RichTextEditor} />
      </div>
    </Router>
  );
}

export default App;

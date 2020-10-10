import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";
import { BsCode } from "react-icons/bs";
import { Link } from "react-router-dom";
import { notify } from "react-notify-toast";
import axios from "axios";


class AllNotes extends React.Component {
  state = {
    allNotes: [],
  };

  componentDidMount() {
    axios
    .get("http://localhost:8000/notes")
    .then(res => {
      const notes = res.data;
      this.setState({ 
        allNotes: notes
      });
    })
  }

  deleteNote({variables}) {
    axios
    .delete("http://localhost:8000/notes/" + variables._id)
    .then(() => {
      this.setState({
        allNotes: this.state.allNotes.filter(note => note._id !== variables._id)})
    })
    .catch(err => {
      console.log(err);
    });
  }

  addChild({variables}) {
    axios
    .get("http://localhost:8000/notes/addChild/" + variables._id)
    .then(res => {
      const newChild = res.data;
      this.setState({ 
        allNotes: this.state.allNotes.concat([newChild])
      });
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
    });
  }

  addSibling({variables}) {
    axios
    .get("http://localhost:8000/notes/addSibling/" + variables._id)
    .then(res => {
      const newSibling = res.data;
      this.setState({ 
        allNotes: this.state.allNotes.concat([newSibling])
      });
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  render() {
    return (
      <div className="container m-t-20">
        <h1 className="page-title">All Notes</h1>
        
        <div className="allnotes-page">
          <div className="columns is-multiline">
            {this.state.allNotes.map(note => (
              <div className="column is-one-third" key={note._id}>
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">{note.title}</p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      {note.content}
                      <br />
                    </div>
                  </div>
                  <footer className="card-footer">
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.addChild({ variables: { _id: note._id } });
                        notify.show("Child note was added successfully", "success");
                      }}
                      className="card-footer-item"
                    >
                      <BsChevronDown />
                    </button>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.addSibling({ variables: { _id: note._id } });
                        notify.show("Sibling note was added successfully", "success");
                      }}
                      className="card-footer-item"
                    >
                      <BsCode />
                    </button>
                    {/* <button
                      onClick={e => {
                        e.preventDefault();
                        this.linkParent({ variables: { _id: note._id } });
                        notify.show("Note was linked to parent successfully", "success");
                      }}
                      className="card-footer-item"
                    >
                      <BsChevronUp />
                    </button> */}
                  </footer>
                  <footer className="card-footer">
                    <Link to={`note/${note._id}`} className="card-footer-item">
                      Edit
                    </Link>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.deleteNote({ variables: { _id: note._id } });
                        notify.show("Note was deleted successfully", "success");
                      }}
                      className="card-footer-item"
                    >
                      Delete
                    </button>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
}

export default AllNotes;

import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";


class NewNote extends React.Component {
  state = {
    title: '',
    content: ''
  }

  setTitle(title) {
    this.setState({
      title: title
    })
  }

  setContent(content) {
    this.setState({
      content: content
    })
  }

  createNote({variables}) {
    const newNote = {
      title: variables.title,
      content: variables.content,
    }
    axios
    .post("http://localhost:8000/notes", newNote)
    .then(res => {
      this.props.history.push("/");
    })
  }

  render() {
    console.log("render is called")
    return (
      <div className="container m-t-20">
        <h1 className="page-title">New Note</h1>

        <div className="newnote-page m-t-20">
          <form
            onSubmit={e => {
              e.preventDefault();

              this.createNote({
                variables: {
                  title: this.state.title,
                  content: this.state.content
                }
              });
            }}
          >
            <div className="field">
              <label className="label">Note Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  type="text"
                  placeholder="Note Title"
                  value={this.state.title}
                  onChange={e => this.setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Note Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="content"
                  rows="10"
                  placeholder="Note Content here..."
                  value={this.state.content}
                  onChange={e => this.setContent(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default withRouter(NewNote);

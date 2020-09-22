import React from "react";
import { notify } from "react-notify-toast";
import { withRouter } from "react-router-dom";
import axios from "axios";


class EditNote extends React.Component {
  state = {
    _id: '',
    title: '',
    content: ''
  }
  
  componentDidMount() {
    axios
    .get("http://localhost:8000/notes/" + this.props.match.params.id)
    .then(res => {
      this.setState({
        _id: res.data._id,
        title: res.data.title,
        content: res.data.content
      })
    })
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

  updateNote({variables}) {
    const editedNote = {
      title: variables.title,
      content: variables.content,
    }
    axios
    .put("http://localhost:8000/notes/" + variables._id, editedNote)
    .then(res => {
      console.log(res.data)
      this.props.history.push("/");
    })
  }

  render() {
    return (
      <div className="container m-t-20">
        <h1 className="page-title">Edit Note</h1>

        <div className="newnote-page m-t-20">
          <form
            onSubmit={e => {
              // Stop the form from submitting
              e.preventDefault();

              this.updateNote({
                variables: {
                  _id: this.state._id,
                  title: this.state.title,
                  content: this.state.content
                }
              });

              notify.show("Note was edited successfully", "success");
            }}
          >
            <div className="field">
              <label className="label">Note Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="title"
                  placeholder="Note Title"
                  defaultValue={this.state.title}
                  onChange={e => this.setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Note Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  rows="10"
                  name="content"
                  type="text"
                  placeholder="Note Content here..."
                  value={this.state.content}
                  onChange={e => this.setContent(e.target.value)}
                  required
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

export default withRouter(EditNote);

import React from 'react';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './ReactQuilComp.css'


class RichTextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component

    this.state = {
      _id: '',
      title: '',
      content: '',
      theme: 'snow'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    var curr_id = localStorage.getItem("current_id");
    this.quillRef = this.reactQuillRef.getEditor();

    axios
    // .get("/api/notes/" + this.props.match.params.id)
    .get("http://localhost:8000/notes/" + curr_id)
    .then(res => {
      this.setState({
        _id: res.data._id,
        // title: res.data.title,
        content: res.data.content
      })
      console.log("contents 2",res.data.content)

    })
    .then(() => {
      this.loadText()
    })
  }

  updateNote = () => {
    const editedNote = {
      title: 'title',
      content: this.state.content,
    }
    axios
    .put("http://localhost:8000/notes/" + this.state._id, editedNote)
    .then(res => {
      console.log(res.data)
      // this.props.history.push("/");
    })
  }

  loadText = () => {
    console.log("contents",this.state.content)
    this.quillRef.setContents(JSON.parse(this.state.content))
  }

  handleChange (content, delta, source, editor) {
    this.state.content = JSON.stringify(editor.getContents())
  }

  // handleThemeChange (newTheme) {
  //   if (newTheme === "core") newTheme = null;
  //   this.setState({ theme: newTheme })
  // }


  render() {
    return (
      <div>
        <ReactQuill
          id="title"
          theme='bubble'
          onChange={this.handleChange}
          modules={RichTextEditor.modules}
          formats={RichTextEditor.formats}
        />
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          theme={this.state.theme}
          onChange={this.handleChange}
          modules={RichTextEditor.modules}
          formats={RichTextEditor.formats}
        />
        {/* <div className="themeSwitcher">
          <label>Theme </label>
          <select onChange={(e) => 
              this.handleThemeChange(e.target.value)}>
            <option value="snow">Snow</option>
            <option value="bubble">Bubble</option>
            <option value="core">Core</option>
          </select>
        </div> */}
        <button id="save" onClick={this.updateNote}>Save</button>
       </div>
     )
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
RichTextEditor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
RichTextEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export default RichTextEditor;
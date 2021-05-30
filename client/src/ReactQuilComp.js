import React from 'react';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './ReactQuilComp.css'


class RichTextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.quillRef_body = null;      // Quill instance
    this.reactQuillRef_body = null; // ReactQuill component

    this.quillRef_title = null;      // Quill instance
    this.reactQuillRef_title = null; // ReactQuill component


    this.state = {
      _id: '',
      title: '',
      titleContent:'',
      bodyContent: '',
      theme: 'snow'
    }

    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentDidMount() {
    var curr_id = localStorage.getItem("current_id");
    console.log("Accessing id for",curr_id)
    this.quillRef_body = this.reactQuillRef_body.getEditor();
    this.quillRef_title = this.reactQuillRef_title.getEditor();
    // var curr_id = localStorage.getItem("current_id");

    axios
    // .get("/api/notes/" + this.props.match.params.id)
    .get("/api/notes/" + curr_id)
    .then(res => {
      this.setState({
        _id: res.data._id,
        title: res.data.title,
        bodyContent: res.data.content
      })
      console.log("contents 2",res.data.content)

    })
    .then(() => {
      // this.removeEnterFunctionalityFromTitle()
      this.loadText()
    })
  }

  updateNote = () => {
    const editedNote = {
      title: this.state.title || 'title' ,
      content: this.state.bodyContent,
    }
    axios
    .put("/api/notes/" + this.state._id, editedNote)
    .then(res => {
      console.log(res.data)
      // this.props.history.push("/");
    })
  }

  // removeEnterFunctionalityFromTitle = () => {
  //   var keyboard = this.quillRef_title.getModule('keyboard');
  //   console.log("keyboard",keyboard)
  //   delete keyboard.hotkeys[13];
  // }

  loadText = () => {
    console.log("contents loadText",this.state.bodyContent)
    this.quillRef_body.setContents(JSON.parse(this.state.bodyContent)) //here
    this.quillRef_title.setContents(JSON.parse(this.state.title))
  }

  handleBodyChange (content, delta, source, editor) {
    this.state.bodyContent = JSON.stringify(editor.getContents()) //here
  }

  handleTitleChange (content, delta, source, editor) {
    this.state.title = JSON.stringify(editor.getContents()) //here
    console.log(this.state.title)

    //Set title length to a maximum value
    var limit = 10
    if (editor.getLength() > limit) {
          this.quillRef_title.deleteText(limit, editor.getLength());
        }
    //possibly put an alert here
  }

  // handleThemeChange (newTheme) {
  //   if (newTheme === "core") newTheme = null;
  //   this.setState({ theme: newTheme })
  // }




  render() {
    return (
      <div>
        <ReactQuill
          ref={(el) => { this.reactQuillRef_title = el }}
          id="title"
          theme='bubble'
          onChange={this.handleTitleChange}
          modules={RichTextEditor.modules1}
          formats={RichTextEditor.formats}
          keyboard = {RichTextEditor.titleKeyboard}
        />
        <ReactQuill
          ref={(el) => { this.reactQuillRef_body = el }}
          theme={this.state.theme}
          onChange={this.handleBodyChange}
          modules={RichTextEditor.modules2}
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
RichTextEditor.modules1 = {
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
  },
  keyboard: {
    bindings: {
      handleEnter: {
        key: 13,
        handler: () => {
          // this.quillRef_title.setSelection(null)
          // this.quillRef_body.focus()
          // this.quillRef_body.setSelection(0,1)

        },
      },
      "header enter": {
        key: 13,
        handler: () => {
          // this.quillRef_title.setSelection(null)
          // this.quillRef_body.focus()
          // this.quillRef_body.setSelection(0,1)},
        }
      },
    },
  }
}
RichTextEditor.modules2 = {
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

RichTextEditor.titleKeyboard = {
  keyboard: {
    bindings: {
        tab: false,
        handleEnter: {
            key: 13,
            handler: function() {
                // Do nothing
            }
        }
    }
}
}

// quill.on('text-change', function (delta, old, source) {
//   if (quill.getLength() > 10) {
//     quill.deleteText(limit, quill.getLength());
//   }
// });


export default RichTextEditor;
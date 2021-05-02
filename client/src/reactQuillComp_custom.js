import React from "react";
import { render } from "react-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const CustomHeart = () => <div><span>&emsp;&emsp;&emsp;&emsp;&emsp;Save</span></div>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}


var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font">
      <option value="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Small</option>
      <option value="small">Normal</option>
      <option value="medium" selected>
        Large
      </option>
      <option value="large">Huge</option>
    </select>
    <select className="ql-bold" />
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-clean" />
    <button className="ql-insertHeart">
      <CustomHeart />
    </button>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  state = { editorHtml: "" };

  handleChange = html => {
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart
      }
    }
    // toolbar: toolbarOptions
  };

  static formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

// const App = () => (
//   <div className="custom-toolbar-example">
//     <h3>Custom Toolbar with React Quill (Fully working)</h3>
//     <Editor placeholder={"Write something or insert a heart ♥"} />
//   </div>
// );

// render(<App />, document.getElementById("root"));

export default Editor;

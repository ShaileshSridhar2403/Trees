import React, { Component } from 'react';
import axios from "axios";
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './ReactQuilComp.css'



class RichTextEditor extends Component {
	constructor(props) {
		super(props);

		this.modules = {
			toolbar: [
				[{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
				[{size: []}],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{'list': 'ordered'}, {'list': 'bullet'}, 
				 {'indent': '-1'}, {'indent': '+1'}],
				['link', 'image', 'video'],
				['clean']
		    ]
		};

		this.formats = [
			'header', 'font', 'size',
			'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent',
			'link', 'image', 'video'
		];

	  	this.state = {
			comments: ''
		}

		this.rteChange = this.rteChange.bind(this);
	}

	saveText = (content,delta,source,editor) => {
		
	}

	loadText = (content,delta,source,editor) => {

	}
	rteChange = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // rich text
		console.log(editor.getText()); // plain text
		console.log(editor.getLength()); // number of characters
		console.log(JSON.stringify(editor.getContents()))
	}


	render() {
	    return (
		<>
	      <div>
	        <ReactQuill theme="snow"  modules={this.modules}
				formats={this.formats} onChange={this.rteChange}
			value={this.state.comments || ''}
			/>
	      </div>
		<button>Save</button>
		</>
	    );
	}

}

export default RichTextEditor;


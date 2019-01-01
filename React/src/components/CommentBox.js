import React, { Component } from 'react';
import {createNewComment} from "../utils/tronweb";

//for the rich text editor:
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(value) {
    this.setState({commentText: value});
  }

  handleSubmit(event) {
    createNewComment(this.state.commentText, this.props.postid,  0);
    event.preventDefault();
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

 formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


  render() {
    return (
    <div className="CommentBox">
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit}>
            <h3>Leave a Comment</h3>

                <label> </label>
                <ReactQuill theme="snow"
                  modules={this.modules}
                  formats={this.formats}
                  value={this.state.commentText} 
                  onChange={this.handleChange}>
                </ReactQuill>
                <p> </p>
                
                <input type="submit" class="btn btn-outline-dark" value="Submit" />
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default CommentBox;

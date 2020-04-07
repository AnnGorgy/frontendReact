import React from 'react';
import { post } from 'axios';

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
    };
  }
  async uplooad(e) {
    e.preventDefault();
    window.location.reload();
    const url = `/Materials/upload`;

    const formData = new FormData();

    formData.append('body', this.state.file);

    return post(url, formData);
  }
  setFile(e) {
    this.setState({ file: e.target.files[0]});
  }
  render() {
    return (
      <div>
          <h1>File Upload</h1>
          <input type="file" onChange={e => this.setFile(e)} />
          <button onClick={e=>this.uplooad(e)} >Upload</button>
          
      </div>
    )
  }
}




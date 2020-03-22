import React from 'react';
import { post } from 'axios';

export class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
    };
  }
  async submit(e) {

    e.preventDefault();
    const url = `http://localhost:32733/api/Materials/upload`;

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
        <form onSubmit={e => this.submit(e)}>
          <div>
             File Upload
          </div>
          <h1>File Upload</h1>
          <input type="file" onChange={e => this.setFile(e)} />
          <button type="submit">Upload</button>
        </form> 
      </div>
    )
  }
}




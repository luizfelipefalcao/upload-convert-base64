import React, { useState } from 'react';
import './style.css';

import axios from 'axios';
import { Link, withRouter } from "react-router-dom";

const accessToken = '9944b09199c62bcf9418d846dd0e4bbdfc6ee4b';

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function UpLoadImg() {

  const [baseImage, setBaseImage] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const selectImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async () => {
    const fd = new FormData();
    fd.append('file', baseImage);
    await axios.post('http://143.198.59.202:8000/api/images', fd)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  };
  
  return (
      <div className='select-field'>
        <div className='select-img'>
          {
            baseImage ? (
              <img src={baseImage} height="220px" alt={baseImage.name}/>
            ) : (
              <h2>Upload your image!</h2>
            )
          }
          {
            baseImage ? (
              <div className='title'>
                <label>Type a title: </label>
                <input type='text' onChange={(e) => setImageTitle(e.target.value)}/>
              </div>
            ) : (
              null
            )
          }
        </div>
        <div className='select-btn'>
          <input type="file" onChange={(e) => selectImage(e)}/>
          <button onClick={uploadImage}>
            <Link to="/search-img">Send Image</Link>
          </button>
        </div>
      </div>
  );
}

export default withRouter(UpLoadImg);

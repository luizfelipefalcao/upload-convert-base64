import React, { useState } from 'react';
import './style.css';

import { Link, withRouter } from "react-router-dom";
// import axios from 'axios';

// const accessToken = 'c83e6427405b98a716461b1c2c1455ddd30dc75c';

// const apiURL = 'http://143.198.59.202:8000/api/images';

// axios.interceptors.request.use(
//   config => {
//     config.headers.authorization = `Bearer ${accessToken}`;
//     return config
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

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
    try {
      await fetch('http://localhost:3003/images', {
        method: 'POST',
        body: JSON.stringify({
          "id": Math.random(),
          "title": imageTitle,
          "body": baseImage,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }catch(e) {
      console.log('erro')
    }
  };
  
  return (
      <div className='select-field'>
        <div className='select-img'>
          {
            baseImage ? (
              <img src={baseImage} height="200px" alt={baseImage.name}/>
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
          <button 
            onClick={uploadImage}
          >
            <Link to="/search-img">Send Image</Link>
          </button>
        </div>
      </div>
  );
}

export default withRouter(UpLoadImg);

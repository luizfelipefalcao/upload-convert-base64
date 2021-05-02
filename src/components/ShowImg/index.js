import React, { useState, useEffect } from 'react';
import './style.css';

import { Link } from 'react-router-dom';

function ShowImg() {

  const [images, setImages] = useState([]);

  useEffect(() => {
		fetch("http://localhost:3003/images")
			.then((response) => response.json())
			.then((data) => {
				setImages(data)
			})
	}, [images])

 return(
    <div className='img-body'>
      <div className='img-content'>
        {images.length > 0 ? (images.slice(-5).map((item) => (
          <ul key={item.id} className='img-products'>
            <img src={item.body} alt={item.title}/>
            <p>{item.title}</p>
          </ul>
        ))
        ) : (
          <p>Loading images...</p>
        )}
      </div>
      <button> <Link to="/upload-img">back</Link> </button>
    </div>
 )
}

export default ShowImg;

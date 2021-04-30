import React, { useState } from 'react';
import './style.css';

import axios from 'axios';

function ShowImg() {

  const [images, setImages] = useState([]);

    const fetchImages = async () => {
      const res = await axios.get("https://images.blankabrand.com/api/images/");
      console.log(res.data);
      };

  return (
    <div>
      <h1>Images:</h1>
      <div>
        {/* Map function here */}
      </div>
    </div>
  );
}

export default ShowImg;

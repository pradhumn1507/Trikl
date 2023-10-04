import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the MERN Stack Image Editor</h1>
      <p>
        This is a web application that allows users to upload images, add logos or images on top of them, overlay text,
        and download the edited images.
      </p>
      <p>Get started by navigating to the Image Editor or Image Uploader:</p>
      <ul>
        <li>
          <Link to="/image-editor">Image Editor</Link>
        </li>
        <li>
          <Link to="/image-uploader">Image Uploader</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;

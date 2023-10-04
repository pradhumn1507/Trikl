import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';                       
import ImageEditor from './components/ImageEditor';
import ImageUploader from './components/ImageUploader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-editor" element={<ImageEditor />} />
        <Route path="/image-uploader" element={<ImageUploader />} />
      </Routes>
    </Router>
  );
}

export default App;

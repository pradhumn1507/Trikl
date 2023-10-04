import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import Konva from 'konva';
import logoImage from '../image.png'; // Import your logo image

function ImageEditor() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [logos, setLogos] = useState([]);
  const [textOverlays, setTextOverlays] = useState([]);
  const [downloadURL, setDownloadURL] = useState(null);
  const [newText, setNewText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [textColor, setTextColor] = useState('black');
  const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
  const [newLogoImage, setNewLogoImage] = useState(null);

  const stageRef = React.useRef(null);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const uploadedImg = new window.Image();
      uploadedImg.src = e.target.result;
      uploadedImg.onload = () => {
        setUploadedImage(uploadedImg);
      };
    };

    reader.readAsDataURL(file);
  };

 // Function to add a logo
const handleAddLogo = () => {
    try {
      const newLogo = {
        type: 'logo',
        x: Math.floor(Math.random() * 400), // Generate a random X position
        y: Math.floor(Math.random() * 300), // Generate a random Y position
        width: 100,
        height: 100,
        image: new window.Image(), // Create a new image element
      };
  
      // Set the source of the image element to the imported logo image
      newLogo.image.src = newLogoImage;
  
      // Listen for the 'load' event to ensure the image is fully loaded
      newLogo.image.onload = () => {
        setLogos([...logos, newLogo]);
      };
    } catch (error) {
      console.error('Error adding logo:', error);
    }
  };
  

  // Function to add a text overlay
  const handleAddTextOverlay = () => {
    const newTextOverlay = {
      type: 'text',
      x: textPosition.x,
      y: textPosition.y,
      text: newText,
      fontSize: fontSize,
      fill: textColor,
    };
    setTextOverlays([...textOverlays, newTextOverlay]);
  };

  // Function to download the edited image
  const handleDownload = () => {
    if (!uploadedImage) {
      console.error('No image uploaded');
      return;
    }

    // Create a new Konva stage to generate the final edited image
    const editedStage = new Konva.Stage({
      container: 'stage-container', // Specify the ID of the container element
      width: 600,
      height: 400,
    });

    const editedLayer = new Konva.Layer();

    // Add the uploaded image to the edited stage
    const image = new Konva.Image({
      image: uploadedImage,
      width: 600,
      height: 400,
    });

    editedLayer.add(image);

    // Add logos to the edited stage
    logos.forEach((logo) => {
      const logoImage = new Konva.Image({
        image: logo.image,
        x: logo.x,
        y: logo.y,
        width: logo.width,
        height: logo.height,
      });
      editedLayer.add(logoImage);
    });

    // Add text overlays to the edited stage
    textOverlays.forEach((textOverlay) => {
      const text = new Konva.Text({
        x: textOverlay.x,
        y: textOverlay.y,
        text: textOverlay.text,
        fontSize: textOverlay.fontSize,
        fill: textOverlay.fill,
      });
      editedLayer.add(text);
    });

    editedStage.add(editedLayer);

    // Convert the edited stage to a data URL for download
    const editedDataURL = editedStage.toDataURL();

    // Set the download URL for the user to download the edited image
    setDownloadURL(editedDataURL);
  };

  useEffect(() => {
    // Update the Konva canvas when logos or text overlays change
    if (stageRef.current) {
      stageRef.current.batchDraw();
    }
  }, [logos, textOverlays]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleAddLogo}>Add Logo</button>
      <input
        type="file"
        accept="image/*"
        onChange={(event) =>
          setNewLogoImage(URL.createObjectURL(event.target.files[0]))
        }
      />
      <div>
        <input
          type="text"
          placeholder="Text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Font Size"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
        <button onClick={handleAddTextOverlay}>Add Text Overlay</button>
      </div>
      <div>
        <label>Text X Position:</label>
        <input
          type="number"
          placeholder="X Position"
          value={textPosition.x}
          onChange={(e) =>
            setTextPosition({ ...textPosition, x: Number(e.target.value) })
          }
        />
        <label>Text Y Position:</label>
        <input
          type="number"
          placeholder="Y Position"
          value={textPosition.y}
          onChange={(e) =>
            setTextPosition({ ...textPosition, y: Number(e.target.value) })
          }
        />
      </div>
      <button onClick={handleDownload}>Download Edited Image</button>

      {uploadedImage && (
        <div id="stage-container">
          <Stage
            ref={stageRef}
            width={600}
            height={400}
          >
            <Layer>
              <Image
                image={uploadedImage}
                draggable
                onDragEnd={(e) => {
                  // Handle image drag events if needed
                }}
              />

              {/* Add logos to the Layer */}
              {logos.map((logo, index) => (
                <Image
                  key={`logo-${index}`}
                  image={logo.image}
                  x={logo.x}
                  y={logo.y}
                  width={logo.width}
                  height={logo.height}
                />
              ))}

              {/* Add text overlays to the Layer */}
              {textOverlays.map((textOverlay, index) => (
                <Text
                  key={`text-overlay-${index}`}
                  x={textOverlay.x}
                  y={textOverlay.y}
                  text={textOverlay.text}
                  fontSize={textOverlay.fontSize}
                  fill={textOverlay.fill}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      )}
      {downloadURL && (
        <a href={downloadURL} download="edited_image.png">
          Download Edited Image
        </a>
      )}
    </div>
  );
}

export default ImageEditor;

import React, {useRef , useState} from 'react'
import axios from 'axios'
import { ReactSketchCanvas } from "react-sketch-canvas"
import '../src/index.css'

const Canvas = () => {
    const canvasRef = useRef(null);
    const [prediction, setPrediction] = useState(null);

    const clear = () => {
        canvasRef.current.clearCanvas();
        setPrediction(null)
    }

    function convertTo28x28Grayscale(imageUrl) {
    return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = imageUrl;

    img.onload = () => {
      // Step 1: Create a 28x28 canvas
      const canvas = document.createElement("canvas");
      canvas.width = 28;
      canvas.height = 28;
      const ctx = canvas.getContext("2d");

      // Step 2: Draw image scaled to 28x28
      ctx.drawImage(img, 0, 0, 28, 28);

      // Step 3: Get image data
      const imageData = ctx.getImageData(0, 0, 28, 28);
      const data = imageData.data;

     

      // Step 4: Convert to grayscale array (0-255)
      const grayscale = [];
      for (let i = 0; i < data.length; i += 4) {
        const r = 255 - data[i];
        const g = 255 - data[i + 1];
        const b = 255 - data[i + 2];
        
        const gray = Math.round((r + g + b) / 3);
        grayscale.push(gray);
      }

      // You now have an array of 784 grayscale values
      resolve(grayscale); // returns [0-255] values
    };
  });
}


    const submit = async () => {
        console.log('submitting....')
        const dataUrl = await canvasRef.current.exportImage()
        const res = await convertTo28x28Grayscale(dataUrl)
        const response = await axios.post('http://127.0.0.1:5000/predict', res)
        
        setPrediction(Object.keys(response.data)[0])
        
    }

    
 return (

  <>
  {/* Description */}
    <div className="container">
      <h1>Welcome to My Machine Learning Project</h1>
        <p>
          This app uses a Convolutional Neural Network (CNN) trained on the MNIST dataset — a large collection of 42,002 hand-drawn digits (0–9), each represented as a 28×28 grayscale image (784 pixels).<br /><br />
          The model was originally built using a Random Forest, but the predictions were inaccurate. Switching to a CNN built with fast.ai significantly improved the results.<br /><br />
          Draw a number in the sketchpad, and the model will predict which digit it recognizes.
        </p>

         <div className="tech-stack">
          <h2>Tech Stack Used</h2>
            <div className="tech-icons">
              <img src="https://imgs.search.brave.com/yExGzP_rRbFvw5BBq8_QjOOL0sAngN68gLelCeFzM_4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL2ZyZWUv/dGh1bWIvZnJlZS1w/eXRob24tM2QtaWNv/bi1kb3dubG9hZC1p/bi1wbmctYmxlbmQt/ZmJ4LWdsdGYtZmls/ZS1mb3JtYXRzLS1o/dG1sLWxvZ28tYy1z/b2Z0d2FyZS1wYWNr/LWxvZ29zLWljb25z/LTUzMjYzODUucG5n/P2Y9d2VicA" alt="Python" />
              <img src="https://imgs.search.brave.com/Vy6_r-lksoh5f0oOY-g1taWNk7JgYP8F66bcP1CANn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL2Zhc3Rh/aS9sb2dvcy9yYXcv/bWFpbi9mYXN0YWlf/c21hbGwucG5n" alt="Fastai" />
              <img src="https://imgs.search.brave.com/lJIuDCRwCv9fagyLYNUrKTpXWEAPk5eXuDP4INyW5Z0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzUwLzIvcHl0b3Jj/aC1sb2dvLXBuZ19z/ZWVrbG9nby01MDMy/NjcucG5n" alt="PyTorch" />
              <img src="https://imgs.search.brave.com/_qi9Jp_1YF7ZUvwncJ_cykn8DX5CfkhUps6gSivcszk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvUmVh/Y3QtTG9nby1QTkcu/cG5n" alt="React" />
              <img src="https://imgs.search.brave.com/PhkEUY6H-5AZxJIUpXbrC2mWYTHacqMN9z2bIPA9yWY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQwLzIvdml0ZS1s/b2dvLXBuZ19zZWVr/bG9nby00MDU5MTIu/cG5n" alt="Vite" />
            </div>
        </div>
    </div>





   <div className="center-screen">
      <div className="card">
        {/* Canvas and controls */}
        <div className="flex-col-center" style={{ height: "250px", justifyContent: "space-between" }}>

          <div className="button-row">

            <button onClick={clear} className="btn btn-clear">
              Clear
            </button>

            <button onClick={submit} className="btn btn-submit">
              Submit
            </button>

          </div>

          <ReactSketchCanvas
            ref={canvasRef}
            className="canvas-border"
            style={{ border: '6px dashed #000',  width: "250px", height: "200px" }}
            strokeWidth={25}
            strokeColor="black"
          />
        </div>

        {/* Prediction card */}
        <div className="same-size-div" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h3 style={{ marginBottom: "12px" }}>Prediction</h3>

          {prediction !== null ? (
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{prediction}</div>
          ) : (
            <div style={{ color: "#888" }}>No prediction yet</div>
          )}
        </div>
      </div>
    </div>
  
  </>
  )
}

export default Canvas
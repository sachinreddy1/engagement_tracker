import React, { useRef, useEffect, useState } from "react";
import '../css/App.css';
import * as tf from "@tensorflow/tfjs";
import { detect } from "../util/utilities"; 
import EngagementTracker from './EngagementTracker';
import Footer from './Footer';
import ReactGA from 'react-ga4';

function App() {
  ReactGA.initialize('G-X2GQWH6CGJ');

  const [data, setData] = useState([]);
  var engagement_value = 0

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const updateEngagementLevel = (engagement_level) => {
    engagement_value = engagement_value + engagement_level
    setData(prevData => [...prevData, {'name': 'Engagement', 'engagement_level': engagement_value, 'time': new Date().toLocaleTimeString()}]);
  }

  const runObjectDetection = async () => {
    try {
      const net = await tf.loadLayersModel('https://s3.amazonaws.com/engagementtracker.net/model/model.json')

      const intervalId = setInterval(() => {
        detect(net, webcamRef, canvasRef, updateEngagementLevel);
      }, 150);

      return () => clearInterval(intervalId);
    } catch (e) {
      console.log(e.message)
    }
  };

  useEffect(() => {
    runObjectDetection()
  }, []);
  
  return (
    <div>
      <EngagementTracker
        webcamRef={webcamRef}
        canvasRef={canvasRef}
        data={data}
      />
      <Footer />
    </div>
  );
}

export default App;

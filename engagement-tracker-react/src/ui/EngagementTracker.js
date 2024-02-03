import React from 'react';
import Webcam from "react-webcam";
import EngagementGraph from './EngagementGraph';

const EngagementTracker = (props) => {
    const videoConstraints = {
        facingMode: "user"
    };

  return (
    <header className="App-header">
        <div className="row" style={{backgroundColor:"#424855"}}>
            <Webcam
              ref={props.webcamRef}
              muted={true} 
              videoConstraints={videoConstraints}
              className="video_container"
              data-testid="webcam"
            />

            <canvas
              ref={props.canvasRef}
              className="video_container stack-top"
              data-testid="canvas"
            />
        </div>

        <div className="row">
          <EngagementGraph
            data={props.data}
            data-testid="graph"
          />
        </div>
      </header>
  );
};

export default EngagementTracker;

import React, { useCallback, useState } from "react";
import Webcam from "react-webcam";

export default function DualCamera() {
    let videoConstraints;

    const [camera, setCamera] = useState(false);

    const frontCamera = useCallback(() => {
        setCamera(false)
    }, [setCamera]);

    // Use rear camera of device if it exists
    const backCamera = useCallback(() => {
        setCamera(true)
    }, [setCamera]);

    if (camera == true) {
        videoConstraints = {
            width: "50%",
            height: "50%",
            facingMode: "environment",
          };    
    } else {
        videoConstraints = {
            width: "50%",
            height: "50%",
            facingMode: "user",
          };
    }

    // const videoConstraints = {
    //     width: 400,
    //     height: 400,
    //     facingMode: "environment",
    // };

    return (
        <div className="centered">
            <h1>Camera Modes</h1>
            <h4>*will only work on devices with two cameras (e.g. a phone).</h4>
             <div className="Webcam">
                <Webcam 
                    mirrored={false}
                    videoConstraints={videoConstraints}
                />
            </div>
            <br></br>
            {/* 
            ternary operator is used (conditon ? true : false)
            if camera is true, show front camera
            else (false), show back camera 
            */}

            {camera ? (
                <button onClick={frontCamera}>Front Camera</button>
            ) : (
                <button onClick={backCamera}>Back Camera</button>
            )}
        </div>
    );
}
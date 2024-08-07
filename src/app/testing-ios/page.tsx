"use client"
import { useEffect, useState, useRef } from "react";

const MotionPage = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [shakeMessage, setShakeMessage] = useState("");
  const btnRef = useRef<HTMLButtonElement>(null);
  const outputMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkMotionPermission();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkMotionPermission = async () => {
    try {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        // @ts-ignore (to suppress TypeScript error)
        const permissionState =
          await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === "granted") {
          setPermissionGranted(true);
          setMotionListeners();
        } else {
          if (btnRef.current) btnRef.current.style.display = "block";
        }
      } else {
        setMotionListeners();
      }
    } catch (error) {
      console.error("Error getting sensor permission:", error);
      if (btnRef.current) btnRef.current.style.display = "block";
    }
  };

  const setMotionListeners = () => {
    window.addEventListener("devicemotion", handleMotionEvent);
  };

  const handleMotionEvent = (event: DeviceMotionEvent) => {
    console.log("Device motion event:", event);

    if (
      event.rotationRate &&
      event.rotationRate.alpha !== null &&
      event.rotationRate.beta !== null &&
      event.rotationRate.gamma !== null &&
      (event.rotationRate.alpha > 256 ||
        event.rotationRate.beta > 256 ||
        event.rotationRate.gamma > 256)
    ) {
      setShakeMessage("SHAKEN!");
      setTimeout(() => {
        setShakeMessage("");
      }, 2000);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        ref={btnRef}
        style={{ display: "none", padding: "2em" }}
        onClick={checkMotionPermission}
      >
        Hey! This will be much better with sensors. Allow?
      </button>
      <div ref={outputMessageRef}>{shakeMessage}</div>
      <h1>Shake to Detect Motion</h1>
      <p>Shake your device to trigger a message.</p>
    </div>
  );
};

export default MotionPage;

import React, { useEffect } from "react";

const AlertBar = ({ show, message }) => {
  useEffect(() => {
    if (show) {
      const audio = new Audio("/alert.mp3");
      audio.play();
    }
  }, [show]);

  if (!show) return null;

  return <div className="alert-bar">{message}</div>;
};

export default AlertBar;

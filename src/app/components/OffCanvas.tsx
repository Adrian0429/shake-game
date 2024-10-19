import React from "react";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}


const Offcanvas = ({ isVisible, onClose }: Props) => {

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } z-[80] bg-[#1F1F1E] border-b rounded-t-lg h-[90vh]`}
      role="dialog"
      aria-labelledby="hs-offcanvas-bottom-label"
    >
      <button onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Offcanvas;

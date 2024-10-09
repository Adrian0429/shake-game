import { initUtils } from "@telegram-apps/sdk";
import React from "react";
import { IconContext } from "react-icons";
import { FaYoutube } from "react-icons/fa";
import { LuYoutube } from "react-icons/lu";


interface Props {
  userId: number;
  isVisible: boolean;
  onClose: () => void;
}

const OffCanvasTask = ({ userId, isVisible, onClose }: Props) => {
  return (
    <>
      <div
        className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } h-[80%] z-20 bg-[#1F1F1E] border-b rounded-t-xl p-3`}
        role="dialog"
        aria-labelledby="hs-offcanvas-bottom-label"
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
            aria-label="Close"
            onClick={onClose}
          >
            <p className="text-black text-H1">X</p>
          </button>
        </div>

        <div className="flex flex-col h-full items-center pt-5">
          <h3
            id="hs-offcanvas-bottom-label"
            className="text-H1 font-bold text-white w-full text-center"
          >
            GET PAID TO WATCH!
          </h3>

          <p className="text-white w-full text-center text-H2 my-4">
            <span className="text-green-500">+ 1000</span> Coins
          </p>

          <div className="flex flex-col justify-center mt-5">
            <p className="text-white text-center text-B2">click to watch the video</p>
            <button className="h-32 w-40 bg-red-500 rounded-xl">
              <LuYoutube className="w-full h-full text-white" />
            </button>
          </div>

          <form className="w-[80%] mt-5">
            <p className="text-center w-full text-white">
              Enter you answer below:
            </p>
            <input
              type="text"
              placeholder="Enter Secret Code"
              className="w-full h-12 mt-2 px-3 rounded-lg text-black"
            />
          </form>

          <p className="w-[90%] text-B1 text-white text-justify mt-5">
            this is the description of the task, what about this? will this be
            enough to fill the description part so it can be developed even
            further ? huhhhh
          </p>
        </div>
      </div>
    </>
  );
};

export default OffCanvasTask;

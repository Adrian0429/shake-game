import React from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaTelegram,
  FaFacebook,
} from "react-icons/fa6";
import { initUtils } from "@telegram-apps/sdk";

interface Props {
  userId: number;
  isVisible: boolean;
  onClose: () => void;
}

const Offcanvas = ({ userId, isVisible, onClose }: Props) => {
  const referralCode = `t.me/shakeTongamebot/start?startapp=${userId}`;

  const handleShareOnTwitter = () => {
    const shareText = "Join me to play this Amazing Game!";
    const fullUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(referralCode)}`;
    window.open(fullUrl);
  };

  const handleShareOnFacebook = () => {
    const fullUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      referralCode
    )}`;
    window.open(fullUrl);
  };

  const handleInviteFriend = () => {
    const utils = initUtils();
    const shareText = "Join me to play this Amazing Game!\n";
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralCode
    )}&text=${encodeURIComponent(shareText)}`;
    utils.openTelegramLink(fullUrl);
  };

  const handleShareOnInstagram = () => {

    const fullUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      referralCode
    )}`;
    window.open(fullUrl);
  };

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } h-[40vh] z-[80] bg-[#D5FF18] border-b rounded-t-3xl px-3 py-5`}
      role="dialog"
      aria-labelledby="hs-offcanvas-bottom-label"
    >
      <div className="flex w-full justify-end">
        <button
          type="button"
          className="size-10 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
          aria-label="Close"
          onClick={onClose}
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center py-3 px-4 mt-4">
        <div className="flex flex-row w-full justify-between">
          <h3
            id="hs-offcanvas-bottom-label"
            className="text-3xl font-medium text-black w-full text-center"
          >
            Choose Your Social Media
          </h3>
        </div>

        <p className="text-black w-full text-center text-base mt-5">
          You can only share it on one of your social media
        </p>
      </div>
      <div className="my-5 flex flex-row justify-between px-5">
        <div
          onClick={handleShareOnTwitter}
          className="flex p-4 rounded-full border-[6px] bg-white border-black w-16 h-16 items-center justify-center"
        >
          <FaXTwitter className="text-2xl" />
        </div>
        <div
          onClick={handleInviteFriend}
          className="flex p-4 rounded-full border-[6px] bg-white border-black w-16 h-16 items-center justify-center"
        >
          <FaTelegram className="text-2xl" />
        </div>
        <div
          onClick={handleShareOnInstagram}
          className="flex p-4 rounded-full border-[6px] bg-white border-black w-16 h-16 items-center justify-center"
        >
          <FaInstagram className="text-2xl" />
        </div>
        <div
          onClick={handleShareOnFacebook}
          className="flex p-4 rounded-full border-[6px] bg-white border-black w-16 h-16 items-center justify-center"
        >
          <FaFacebook className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;

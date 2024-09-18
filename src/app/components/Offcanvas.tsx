import { initUtils } from '@telegram-apps/sdk';
import React from 'react'
import { FaInstagram, FaXTwitter, FaTelegram, FaFacebook } from 'react-icons/fa6';

interface props {
  userId: number;
}


const Offcanvas = ({userId}: props) => {

  const referralCode = `t.me/shakeTongamebot/start?startapp=${userId}`;

    const handleShareOnTwitter = () => {
      const shareText = "Join me to play this Amazing Game!";
      const fullUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(referralCode)}`;
      window.open(fullUrl, "_blank");
    };

    const handleShareOnFacebook = () => {
      const fullUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralCode
      )}`;
      window.open(fullUrl, "_blank");
    };

    const handleInviteFriend = () => {
        const utils = initUtils();
        const shareText = `Join me to play this Amazing Game!`;
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
          referralCode
        )}&text=${encodeURIComponent(shareText)}`;
        utils.openTelegramLink(fullUrl);
      };

const handleShareOnInstagram = () => {
  const shareText = "Check out this amazing game!";
  const fullUrl = `https://www.instagram.com/?url=${encodeURIComponent(
    referralCode
  )}`;
  window.open(fullUrl, "_blank");
};
  return (
    <div
      id="hs-offcanvas-bottom"
      className="hs-overlay hs-overlay-open:translate-y-0 translate-y-full fixed bottom-0 inset-x-0 transition-all duration-300 transform h-fit size-full z-[80] bg-[#1F1F1E] border-b hidden rounded-t-lg"
      role="dialog"
      aria-labelledby="hs-offcanvas-bottom-label"
    >
      <div className="flex flex-col items-center py-3 px-4">
        <div className="flex flex-row w-full justify-between">
          <h3
            id="hs-offcanvas-bottom-label"
            className="text-xl font-bold text-white w-full text-center"
          >
            Choose Your Social Media
          </h3>

          <button
            type="button"
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Close"
            data-hs-overlay="#hs-offcanvas-bottom"
          >
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <p
          id="hs-offcanvas-bottom-label"
          className="text-white w-full text-center text-base mt-5"
        >
          You can only share it on one of your social media
        </p>
      </div>
      <div className="my-5 flex flex-row justify-between px-5">
        <div onClick={handleShareOnTwitter} className="flex p-4 rounded-full border-[6px] bg-white border-[#EBFF39] w-16 h-16 items-center justify-center">
          <FaXTwitter className='text-2xl'/>
        </div>
        <div onClick={handleInviteFriend} className="flex p-4 rounded-full border-[6px] bg-white border-[#EBFF39] w-16 h-16 items-center justify-center">
          <FaTelegram className='text-2xl'/>
        </div>
        <div onClick={handleShareOnInstagram} className="flex p-4 rounded-full border-[6px] bg-white border-[#EBFF39] w-16 h-16 items-center justify-center">
          <FaInstagram className='text-2xl'/>
        </div>
        <div onClick={handleShareOnFacebook} className="flex p-4 rounded-full border-[6px] bg-white border-[#EBFF39] w-16 h-16 items-center justify-center">
          <FaFacebook className='text-2xl'/>
        </div>
      </div>
    </div>
  );
}

export default Offcanvas
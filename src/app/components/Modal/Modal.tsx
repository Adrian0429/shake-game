"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface ModalAllowProps {
  username: string;
  onAllowPermission: () => void;
  isOpen: boolean;
}

function ModalPermission({
  onAllowPermission,
  username,
  isOpen,
}: ModalAllowProps) {
  if (!isOpen) return null;

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
      <div className="relative flex flex-col items-center mx-auto py-4 px-6 bg-[#232328] min-h-[240px] w-[300px] rounded-lg z-100">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome {username}
        </h1>
        <h1 className="text-lg font-bold mt-2 text-center text-white">
          Please Allow Access to your device shake sensor by clicking this button below
        </h1>
        <button
          className="w-[80%] mt-4 h-12 bg-[#D5FF18] cursor-pointer select-none
            active:translate-y-2 active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
            active:border-b-[0px] transition-all duration-150 [box-shadow:0_2px_0_0_#ABC340,0_4px_0_0_#ffffff]
            rounded-full border-[1px] border-[#D5FF18] mb-3"
          onClick={onAllowPermission}
        >
          <span className="flex justify-center items-center h-full text-black font-bold text-2xl">
            Allow
          </span>
        </button>
      </div>
    </dialog>
  );
}

export default ModalPermission;

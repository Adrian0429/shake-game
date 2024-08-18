"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface ModalAllowProps {
  onAllowPermission: () => void;
}

function ModalAllow({ onAllowPermission }: ModalAllowProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const modal = searchParams.get("ModalPermission");
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
          <div className="relative flex flex-col items-center mx-auto p-8 bg-white h-[240px] w-[300px] rounded-lg z-100">
            <h1 className="text-xl font-bold my-4 text-center">
              Please Allow The Device Shake Permission
            </h1>
            <button
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
              onClick={onAllowPermission}
            >
              Allow Device Motion
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

export default ModalAllow;

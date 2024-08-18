"use client";
import { useEffect, useState, useContext } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { ShakeContext } from '../../context/ShakeContext';
import { useRouter } from "next/navigation";

function ModalAllow() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const modal = searchParams.get("ModalPermission");
  const router = useRouter();
  const shakeContext = useContext(ShakeContext);

  const {
    permissionGranted,
    checkMotionPermission,
  } = useContext(shakeContext);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  
  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
          <div className="relative flex flex-col items-center mx-auto p-8 bg-white min-h-[300px] w-[85%] rounded-lg z-100">
            <h1 className="text-xl font-bold my-4 text-center">
              Please Allow The Device Shake Permission
            </h1>
            
            {!permissionGranted && (
              <button
                className='bg-slate-500 w-[50%] hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4'
                onClick={checkMotionPermission}
              >
                Allow Device Motion
              </button>
            )}  
          </div>
        </dialog>
      )}
    </>
  );
}

export default ModalAllow;

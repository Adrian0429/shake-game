"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { FiAlertTriangle, FiX } from "react-icons/fi";

function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const modal = searchParams.get("modal");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
          <div className="relative flex flex-col items-center mx-auto p-8 bg-white min-h-[300px] w-[85%] rounded-lg z-100">
            <Link
              href={pathname}
              className="absolute top-2 right-2 p-2 text-gray-700 hover:text-gray-900"
            >
              <FiX className="text-xl" />
            </Link>
            <h1 className="text-xl font-bold my-4 text-center">
              Welcome To The Best Shaking Game Ever !
            </h1>

            <form action="" className="w-full h-full">
              <div className="w-full my-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium mb-2">Email</label>
                  <span className="block mb-2 text-sm text-red-500">
                    Optional
                  </span>
                </div>
                <input
                  type="email"
                  id="with-corner-hint"
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="user@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Label</label>
                <select
                  id="hs-select-label"
                  className="py-3 px-3 pe-9 block border w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <option selected={true}>Select Your Region</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </form>

            <div className="mt-4 flex w-full flex-row justify-center space-x-5">
              <Link href={pathname}>
                <button className="border bg-red-500 py-3 px-6 rounded-lg text-white font-semibold">
                  Cancel
                </button>
              </Link>

              <Link href={pathname}>
                <button className="border bg-blue-500 py-3 px-6 rounded-lg text-white font-semibold">
                  Confirm
                </button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;

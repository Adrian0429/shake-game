"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { FiAlertTriangle, FiChevronDown, FiX } from "react-icons/fi";
import countries from "@/app/constant/Country";

interface Country {
    name: string;
    code: string;
}

function Modal() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState<Country | null>(null);
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

              {/* dropdown */}
              <div className="z-10 hs-dropdown relative inline-flex flex-col w-full mt-2">
                <p className="text-sm font-medium mb-2 text-start">Region</p>
                <button
                  id="hs-dropdown-default"
                  type="button"
                  className="hs-dropdown-toggle py-3 px-2 inline-flex items-center gap-x-2 w-full text-sm font-medium rounded-lg border border-slate-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <p className="w-full ml-2 text-start">
                    {SelectedCountry?.name || "Select Region"}
                  </p>
                  <FiChevronDown />
                </button>

                <div
                  className="hs-dropdown-menu transition-[opacity,margin] max-h-[300px] overflow-y-scroll duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg p-1 mt-2 after:h-4 after:absolute z-30 after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:start-0 before:w-full"
                  aria-labelledby="hs-dropdown-default"
                >
                  {countries.map((country, index) => (
                    <a
                      key={index}
                      className="flex items-center my-1 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      href="#"
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country.name}
                    </a>
                  ))}
                  <input type="text" value={SelectedCountry?.code} className="hidden"/>
                </div>
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

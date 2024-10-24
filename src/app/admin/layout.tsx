"use client"
import { AiFillHome } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";


const Footerdata = [
  {
    name: "list",
    endpoint: "/admin",
    icon: <AiFillHome className="text-2xl mb-1 group-hover:text-[#E0FD60]" />,
  },
  {
    name: "Add",
    endpoint:"/admin/add",
    icon: (
      <HiPlus className="text-2xl mb-1 group-hover:text-[#E0FD60]" />
    ),
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const pathname = usePathname();

  return (
    <div>
        {children}
        <div className="fixed bottom-0 left-0 z-20 w-full h-[4.5rem]">

              <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                {Footerdata.map((item, index) => {
                  if (pathname === "/admin/login") {
                    return null;
                  }
                  const isActive = pathname === item.endpoint;
                  return (
                    <button
                      key={index}
                      className="inline-flex flex-col items-center justify-center px-5"
                    >
                      <Link
                        href={item.endpoint}
                        className={`${
                          isActive ? "text-[#232328]" : "text-gray-400"
                        } text-2xl mb-1 group-hover:text-[#232328]`}
                      >
                        {item.icon}
                      </Link>
                      <span
                        className={`${
                          isActive ? "text-[#232328]" : "text-gray-500"
                        } text-sm group-hover:text-[#232328]`}
                      >
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
    </div>
  );
}

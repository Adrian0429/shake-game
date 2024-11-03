"use client";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex flex-col space-y-4 w-full px-10 justify-center items-center">
        <Link
          href="/admin/news"
          className="w-full max-w-4xl bg-blue-500 text-white rounded-lg flex items-center justify-center p-4 shadow-lg hover:bg-blue-600 transition duration-300"
        >
          News
        </Link>
        <Link
          href="/admin/referral"
          className="w-full max-w-4xl bg-blue-500 text-white rounded-lg flex items-center justify-center p-4 shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Referral
        </Link>
        <Link
          href="/admin/follow"
          className="w-full max-w-4xl bg-blue-500 text-white rounded-lg flex items-center justify-center p-4 shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Follow
        </Link>
        <Link
          href="/admin/news-content"
          className="w-full max-w-4xl bg-blue-500 text-white rounded-lg flex items-center justify-center p-4 shadow-lg hover:bg-blue-600 transition duration-300"
        >
          News Content
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

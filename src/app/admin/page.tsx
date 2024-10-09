"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; 

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Home() {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent : string) => {
    setContent(newContent);
  };

  const handleLogContent = () => {
    console.log(content);
  };

  return (
    <main>
      <div className="h-screen w-screen flex items-center flex-col">
        <div className="h-full w-[90vw]">
          <QuillEditor
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-[70%] mt-10 bg-white"
          />
        </div>
        <button
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLogContent}
        >
          Log Content
        </button>
        <div
          className="rich-text-content list-disc list-inside pl-5 text-justify border w-full"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}

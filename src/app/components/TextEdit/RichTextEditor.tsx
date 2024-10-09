"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  onChange: (content: string) => void;
  
}

const RichTextEditor = ({ onChange }: RichTextEditorProps) => {
  const [value, setValue] = useState("");

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content);
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      theme="snow"
      modules={{
        toolbar: [
          [{ font: [] }, { size: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          [{ color: [] }, { background: [] }],
          ["link", "image"],
          ["clean"],
        ],
      }}
      formats={[
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "align",
        "color",
        "background",
        "link",
        "image",
      ]}
    />
  );
};

export default RichTextEditor;

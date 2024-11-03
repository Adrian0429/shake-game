"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

type CreateTaskRequest = {
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
  category: string;
};

type CreateTaskResponse = {
  data: {
    title: string;
    description: string;
    reward: number;
    link: string;
    code: string;
    video: string;
  };
  message: string;
  status: boolean;
};

const CreateTaskAdmin = () => {
  const [content, setContent] = useState("");
  const methods = useForm<CreateTaskRequest>({
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data: CreateTaskRequest) => {
    data.reward = Number(data.reward);
    data.description = content;
    console.log(data);

    try {
      const cookies = parseCookies();
      const response = await axios.post<CreateTaskResponse>(
        "https://api2.fingo.co.id/api/task",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.adminJwt}`,
          },
        }
      );
      toast.success("Task created successfully");
      window.location.href = "/admin/news-content";
      console.log(response);
    } catch (error) {
      console.error("There was a problem with the login request:", error);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
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

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen flex items-center flex-col py-6 overflow-y-scroll"
      >
        <div className="space-y-4 w-[90%] ">
          <div>
            <p className="">Title</p>
            <input
              id="title"
              type="title"
              {...methods.register("title", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <p className="">Category</p>
            <select
              id="category"
              {...methods.register("category", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="General">General</option>
              <option value="TON">TON</option>
              <option value="Knowledge">Knowledge</option>
            </select>
          </div>

          <div>
            <p className="">Rewards</p>
            <div className="relative">
              <input
                id="reward"
                type="number"
                {...methods.register("reward", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <p className="">Image Link</p>
            <div className="relative">
              <input
                id="link"
                type="text"
                {...methods.register("link", { required: false })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <p className="">Video Link</p>
            <div className="relative">
              <input
                id="video"
                type="text"
                {...methods.register("video", { required: false })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="h-[17.5rem] my-2">
            <p>Description</p>
            <QuillEditor
              value={content}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              className="w-full mt-3 h-full max-h-[10rem] bg-white"
            />
          </div>

          <div>
            <p className="">Code</p>
            <div className="relative">
              <input
                id="code"
                type="text"
                {...methods.register("code", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-5 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create!
          </button>
        </div>

        {/* <button
            className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            type="submit"
          >
            Log Content
          </button>

          <div
            className="rich-text-content list-disc list-inside pl-5 text-justify border w-full"
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}
      </form>
    </FormProvider>
  );
};

export default CreateTaskAdmin;

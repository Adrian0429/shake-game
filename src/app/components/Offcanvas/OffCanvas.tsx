
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuYoutube } from "react-icons/lu";

type Task = {
  id: number;
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
  category: string;
};

interface Props {
  isVisible: boolean;
  onClose: () => void;
  task: Task | null;
}

type ClearRequest = {
  task_id: string;
  code: string;
};

const Offcanvas = ({ isVisible, onClose, task }: Props) => {
  const methods = useForm<ClearRequest>({
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ClearRequest) => {
    console.log(data.code)
    console.log(data.task_id)
  };

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform px-4 py-5 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } z-[80] bg-[#1F1F1E] border-b rounded-t-lg h-[95vh] overflow-y-scroll`}
      role="dialog"
      aria-labelledby="hs-offcanvas-bottom-label"
    >
      <div className="flex w-full justify-end">
        <button
          onClick={onClose}
          className="text-black text-lg bg-white rounded-full w-8 h-8"
        >
          X
        </button>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-[#404040] space-y-5 py-5 rounded-2xl mt-3"
        >
          <p className="text-center font-bold text-xl w-full text-white">
            Masukkan Jawaban Anda
          </p>

          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Kirim
          </label>

          <div className="relative w-[90%] rounded-lg ">
            <input
              type="text"
              id="code"
              className="block w-full p-4 text-sm text-gray-900 rounded-3xl bg-[#FDFDFF]"
              placeholder="Enter code"
              required
            />

            <button
              type="submit"
              className="text-black absolute end-2.5 bottom-2 bg-[#CAEB45] font-medium rounded-3xl text-sm px-4 py-2"
            >
              Kirim
            </button>
          </div>
        </form>
      </FormProvider>

      <div className="flex flex-col items-center justify-center bg-[#404040] space-y-5 py-5 px-5 rounded-2xl mt-3">
        {/* <Image className="w-[90%]" src={}/> */}

        {task && task.link && (
          <div className="w-full">
            <img
              alt={task.title}
              src={task.link}
              className="w-full h-48 rounded-xl object-cover"
            />
          </div>
        )}

        {task && task.video && (
          <div className="flex flex-col justify-center mt-5 w-full">
            <p className="text-white text-center text-B2 font-semibold">
              Klik untuk membuka video
            </p>
            <Link
              target="blank"
              href={task.video}
              className="h-48 w-full bg-red-500 rounded-xl"
            >
              <LuYoutube className="w-full h-full text-white" />
            </Link>
          </div>
        )}

        {/* <div className="bg-slate-400 w-full h-48 rounded-xl"></div> */}
        <p className="font-extralight text-md w-full text-white">
          + {task?.reward} GULD
        </p>
        <h1 className="w-full font-bold text-2xl text-white">{task?.title}</h1>
        <div
          className="rich-text-content list-disc list-inside text-justify text-white mt-5 px-5 font-thin w-full"
          dangerouslySetInnerHTML={{ __html: task?.description || "" }}
        />
      </div>
    </div>
  );
};

export default Offcanvas;

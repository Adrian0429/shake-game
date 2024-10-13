import { initUtils } from "@telegram-apps/sdk";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { FaYoutube } from "react-icons/fa";
import { LuYoutube } from "react-icons/lu";
import { showSuccessToast } from "../toast";

type Task = {
  id: number;
  title: string;
  description: string;
  reward: number;
  link: string;
  code: string;
  video: string;
};

interface Props {
  task: Task;
  isVisible: boolean;
  userId: number;
  onClose: () => void;
}

type ClearRequest = {
  task_id: string;
  code: string;
  
};

const OffCanvasTask = ({userId, task, isVisible, onClose }: Props) => {

  const router = useRouter();
  const methods = useForm<ClearRequest>({
    mode: "onChange",
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data: ClearRequest) => {
    data.task_id = String(task.id);
    try {
      const cookies = parseCookies();

      const response = await axios.post(
        "https://api2.fingo.co.id/api/task/clear",
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json", 
          },
        }
      );
      if (response.data.status == true) {
        showSuccessToast("Success!");
        onClose();
      }
    } catch (error) {
      console.error("There was a problem with the request:", error);
    }
  };

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } h-[80vh] z-50 bg-[#1F1F1E] border-b rounded-t-xl p-3`}
      role="dialog"
      aria-labelledby="hs-offcanvas-bottom-label"
    >
      <div className="flex justify-end">
        <button
          type="button"
          className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
          aria-label="Close"
          onClick={onClose}
        >
          <p className="text-black text-H1">X</p>
        </button>
      </div>

      <div className="flex h-[72vh] flex-col items-center pt-5 overflow-y-scroll ">
        <h1
          id="hs-offcanvas-bottom-label"
          className="text-H1 font-bold text-white w-full text-center"
        >
          {task.title}
        </h1>

        <p className="text-white w-full text-center text-H2 my-4">
          <span className="text-green-500">+{task.reward}</span> Coins
        </p>

        {task.video && (
          <div className="flex flex-col justify-center mt-5">
            <p className="text-white text-center text-B2">
              click to watch the video
            </p>
            <Link target="blank" href={task.video} className="h-32 w-40 bg-red-500 rounded-xl">
              <LuYoutube className="w-full h-full text-white" />
            </Link>
          </div>
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[80%] my-5 flex flex-col items-center justify-center"
          >
            <p className="text-center w-full text-white">
              Enter you answer below:
            </p>
            <input
              type="text"
              placeholder="Enter Secret Code"
              className="w-full h-12 mt-2 px-3 rounded-lg text-black"
              {...methods.register("code", { required: true })}
            />

            <button
              type="submit"
              className="w-[60%] h-10 mt-2 px-3 text-black border rounded-lg bg-[#D5FF18]"
            >
              Submit
            </button>
          </form>
        </FormProvider>

        {task.link && (
          <div>
            <img
              alt={task.title}
              src={task.link}
              height={300}
              width={300}
              className="w-full max-h-[300px] rounded-lg"
            />
          </div>
        )}

        <div
          className="rich-text-content list-disc list-inside text-justify w-full text-white mt-5 px-5"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />
        {/* <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, alias. Suscipit cum dolores nam eligendi quae enim reiciendis placeat est esse, fuga consequuntur accusamus voluptates aliquam sapiente ad veritatis magni corporis vitae consectetur eius, quam inventore recusandae at! Fuga molestias tenetur esse ipsum nobis quae quaerat quo dolorum nostrum, sint vitae necessitatibus odio repellendus cumque praesentium ex! Accusantium earum obcaecati, repellat laborum dolorum ipsa nesciunt a assumenda facere blanditiis ea corrupti consequuntur quam aliquid? Assumenda, earum sint necessitatibus ipsa consectetur, cum ullam maiores pariatur distinctio id ut, illum cupiditate! Porro sapiente maiores quae tenetur voluptates magnam! Natus, totam dolorem numquam dolorum sapiente voluptates dolores ea consectetur nostrum, porro officiis ratione animi ab voluptas aspernatur sit dicta deleniti cupiditate aperiam, officia cum non illo veniam! Corporis quisquam dicta voluptatibus officia, esse fugiat eos cumque quidem repellendus velit quod veniam numquam maiores quo dolore eum ipsum autem eligendi praesentium quasi quae blanditiis ut? Recusandae quos aspernatur natus vel error consectetur asperiores architecto dolorum soluta, inventore deserunt nesciunt tempore quas aut dolorem sint accusantium voluptatem ab ullam laudantium dignissimos at tempora dolores enim! Perferendis perspiciatis minus repellendus velit molestiae laborum! Corporis labore qui ipsum voluptatem, nihil ex porro, quia ea dolore similique maiores eum aut omnis eius repellat pariatur rem eveniet illum? Cumque veritatis porro nisi explicabo, distinctio, iure voluptate aut dolor molestias, officia voluptatibus aliquid velit voluptas veniam facere pariatur quo id est. Neque quod possimus amet quam, magni adipisci dolores ut nobis numquam impedit! Laboriosam assumenda dolorem dolore. Unde adipisci cum deleniti quas excepturi eius, dolores voluptates quod, exercitationem vel explicabo facilis provident veritatis natus sapiente architecto rem, neque numquam praesentium distinctio rerum. Hic optio nam iure sunt delectus, sint aspernatur voluptatibus repudiandae laboriosam consectetur id. Omnis fuga repellendus at ipsam quidem eos consectetur asperiores sequi fugiat, ipsa explicabo animi officia! Ad illo illum, optio exercitationem aut sequi, beatae sint alias provident porro fuga. Reiciendis officiis sapiente atque unde consequatur inventore, ipsum sed quidem amet tempore sit. Nihil recusandae quaerat quos at provident doloribus quas voluptate, doloremque ratione, illo sed earum debitis similique temporibus repellat maiores nostrum rerum eveniet officiis laudantium consectetur? Perferendis corrupti repellat eaque obcaecati fugit beatae, minus mollitia voluptatum ipsam neque maxime esse earum saepe cum culpa. In quae culpa voluptatum quia ullam distinctio deleniti, natus repudiandae voluptatem dolore, impedit, dicta vel. Veniam cumque sed saepe, ratione non illo mollitia eligendi provident cum, quo accusamus numquam quibusdam praesentium hic fuga neque in repellat aspernatur! In quos reiciendis laborum maiores, perspiciatis ea dolore placeat consectetur ut sapiente? Ea facere, deleniti commodi sed neque quas odit mollitia culpa sint odio corrupti et, similique consequuntur facilis qui accusamus error cumque aliquam dolorem accusantium cupiditate sequi voluptatum quo hic? Facere atque dolorum cupiditate inventore commodi aperiam. Officiis repudiandae beatae ipsum nesciunt officia fugiat totam voluptas nemo sint, ut reprehenderit sunt odit. Magnam debitis, officia consectetur esse iste doloribus expedita alias consequuntur possimus nesciunt est incidunt? Voluptate quas illum minus repellat nesciunt porro accusamus rem ipsam repellendus aut ratione unde, soluta architecto perferendis?
        </p> */}
      </div>
    </div>
  );
};

export default OffCanvasTask;

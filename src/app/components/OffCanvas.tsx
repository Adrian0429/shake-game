import Image from "next/image";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

type ClearRequest = {
  task_id: string;
  code: string;
};

const Offcanvas = ({ isVisible, onClose }: Props) => {
  const methods = useForm<ClearRequest>({
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ClearRequest) => {
    alert(data)
  };

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform px-4 py-5 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } z-[80] bg-[#1F1F1E] border-b rounded-t-lg h-[90vh] overflow-y-scroll`}
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
            Enter you answer
          </p>

          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>

          <div className="relative w-[90%] rounded-lg ">
            <input
              type="search"
              id="search"
              className="block w-full p-4 text-sm text-gray-900 rounded-3xl bg-[#FDFDFF]"
              placeholder="Enter code"
              required
            />

            <button
              type="submit"
              className="text-black absolute end-2.5 bottom-2 bg-[#CAEB45] font-medium rounded-3xl text-sm px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </FormProvider>

      <div
        className="flex flex-col items-center justify-center bg-[#404040] space-y-5 py-5 px-5 rounded-2xl mt-3"
      >

        {/* <Image className="w-[90%]" src={}/> */}
        <div className="bg-slate-400 w-full h-48 rounded-xl"></div>
        <p className="font-extralight text-md w-full text-white">
          + 150 Tokens
        </p>
        <h1 className="w-full font-bold text-2xl text-white">Join Rating Community</h1>
        <p className="text-white font-thin w-full line">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, hic nostrum asperiores dolores ipsa eius molestiae quod sint a, eaque, voluptas impedit quisquam. At, ad fugiat. Cupiditate impedit modi, facilis beatae minima eaque ratione magnam nobis incidunt perferendis. Obcaecati quia maxime consequuntur quibusdam alias! Ducimus labore possimus architecto autem alias id fuga hic eligendi minus fugit doloribus a eum fugiat, iusto enim impedit similique molestias maiores repellat nisi aliquid facere. Possimus, perferendis earum excepturi alias quos laudantium commodi temporibus officiis quia voluptatibus reprehenderit voluptas quisquam accusantium consequuntur iure repellat voluptatem fugit. Voluptatum, porro quae natus nam debitis soluta beatae laboriosam nulla totam vel dolore minima, esse quisquam maiores enim. Natus voluptatum quisquam vitae nemo sint, sunt quibusdam fugit laboriosam, adipisci sed quam ex iste dolorem! Itaque aut eos saepe quasi blanditiis expedita voluptas aliquid voluptatibus mollitia harum, ab corporis a quidem obcaecati in atque at impedit tempore est aliquam odio totam sunt eum quisquam! Possimus esse, odio fugiat voluptas eum quidem tenetur exercitationem nesciunt optio ad ducimus, repudiandae nam neque expedita! Molestias exercitationem ipsam explicabo reprehenderit optio odio unde atque voluptatum quam quod natus, quaerat vel praesentium cum ad aspernatur debitis. Nesciunt ex accusamus debitis quaerat, incidunt numquam unde. Facere.</p>
      </div>

    </div>
  );
};

export default Offcanvas;

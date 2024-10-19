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
      } z-[80] bg-[#1F1F1E] border-b rounded-t-lg h-[90vh]`}
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
          <p className="text-center w-full text-white">Enter you answer</p>

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
              className="text-black absolute end-2.5 bottom-2.5 bg-[#CAEB45] font-medium rounded-3xl text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Offcanvas;

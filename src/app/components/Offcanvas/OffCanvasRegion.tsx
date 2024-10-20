import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import countries from "@/app/constant/country";

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

type ClearRequest = {
  email: string;
};

const OffCanvasRegion = ({ isVisible, onClose }: Props) => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null); // State to track the selected country

  const methods = useForm<ClearRequest>({
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ClearRequest) => {
    alert(data);
  };

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform px-4 py-5 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } z-[80] bg-[#1F1F1E] border-b rounded-t-lg h-[80vh] overflow-y-scroll`}
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
          className="flex flex-col items-center justify-center space-y-5 py-5 rounded-2xl mt-3"
        >
          <p className="text-white font-semibold text-2xl">
            Choose Your Country
          </p>

          {/* Map through countries and handle active state */}
          {countries.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setActiveCountry(item.code)} // Set active country on click
              className={`w-[90%] py-4 px-5 rounded-2xl text-start  ${
                activeCountry === item.code
                  ? "bg-[#CAEB45] text-black"
                  : "bg-[#404040] text-white"
              }`}
            >
              {item.name}
            </button>
          ))}

          <button
            type="submit"
            className="block w-full p-4 text-sm text-gray-900 text-md font-medium rounded-3xl bg-[#CAEB45]"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default OffCanvasRegion;

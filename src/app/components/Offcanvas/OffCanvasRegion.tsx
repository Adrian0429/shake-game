import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import countries from "@/app/constant/country";
import { parseCookies } from "nookies";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


type ClearRequest = {
  email: string;
  country: string;
  exchange: string;
  phone: string;
};

const OffCanvasRegion = ({ isVisible, onClose, onSuccess }: Props) => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const methods = useForm<ClearRequest>({
    mode: "onChange",
    defaultValues: {
      email: "",
      country: "",
      exchange: "",
      phone: "",
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  const updateKYC = async (data: ClearRequest) => {
    try {
      console.log(data);
      const cookies = parseCookies();
      const response = await axios.patch(
        "https://api2.fingo.co.id/api/user",
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === true) {
        toast.success("successfully set region!");
        reset();
        onSuccess();
        // console.log(response.data);
      }
    } catch (error) {
      toast.error("Error setting region");
      console.error("Error:", error);
    }
  };

  const onSubmit = async (data: ClearRequest) => {
    const updatedData = { ...data, region: activeCountry || "" };
    updateKYC(updatedData);
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
          className="h-[70%] rounded-3xl mt-5 "
        >
          <div className="flex flex-col mx-auto h-full overflow-y-scroll space-y-5">
            {countries.map((item) => (
              <button
                key={item} // Using index as key since we don't have unique codes
                type="button"
                onClick={() => {
                  setActiveCountry(item);
                  setValue("country", item);
                }}
                className={`w-full py-4 px-5 rounded-2xl text-start ${
                  activeCountry === item
                    ? "bg-[#CAEB45] text-black"
                    : "bg-[#404040] text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </form>

        <button
          onClick={handleSubmit(onSubmit)}
          className="block w-full mt-5 p-4 text-sm text-gray-900 text-md font-medium rounded-3xl bg-[#CAEB45]"
        >
          Kirim
        </button>
      </FormProvider>
    </div>
  );
};

export default OffCanvasRegion;

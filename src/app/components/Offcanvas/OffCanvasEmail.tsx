
import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdMarkEmailRead } from "react-icons/md";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ClearRequest = {
  email: string;
  region: string;
  exchange: string;
};


const OffCanvasEmail = ({ isVisible, onClose, onSuccess }: Props) => {
  const methods = useForm<ClearRequest>({
    mode: "onChange",
    defaultValues: {
      email: "",
      region: "",
      exchange: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const updateKYC = async (data: ClearRequest) => {
    try {

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
        // console.log(response.data);
        toast.success("successfully set email!");
        onSuccess();
        reset();
      }
    } catch (error) {
      toast.error("Error setting email");
      console.error("Error:", error);
    }
  };

  const onSubmit = async (data: ClearRequest) => {
    updateKYC(data);
  };

  return (
    <div
      className={`hs-overlay fixed bottom-0 inset-x-0 transition-all duration-300 transform px-4 py-5 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } z-[80] bg-[#1F1F1E] border-b rounded-t-lg h-[80vh] overflow-y-scroll`}
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
          className="flex flex-col items-center justify-center space-y-5 py-5 rounded-2xl mt-3"
        >
          <MdMarkEmailRead className="text-[#CAEB45]" size={72} />

          <p className="text-white font-semibold text-2xl">
            Submit Your Email !
          </p>

          <input
            type="email"
            id="email"
            className="block w-full p-4 text-sm rounded-3xl bg-[#404040] text-white"
            placeholder="Enter email"
            {...methods.register("email")}
          />

          <button className="block w-full p-4 text-sm text-gray-900 text-md font-medium rounded-3xl bg-[#CAEB45]">
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default OffCanvasEmail;

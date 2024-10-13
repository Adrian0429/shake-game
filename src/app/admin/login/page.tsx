"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponse = {
  data: {
    role: string;
    token: string;
  };
  message: string;
  status: boolean;
};

const LoginAdmin = () => {
    const router = useRouter()
    const methods = useForm<LoginRequest>({
        mode: "onChange",
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data: LoginRequest) => {
        try {
            const response = await axios.post<LoginResponse>(
              "https://api2.fingo.co.id/api/user/login",
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if(response.data.status == true){
                setCookie(null, "adminJwt", response.data.data.token, {
                  maxAge: 3 * 60 * 60,
                  path: "/",
                });
                router.push('/admin')
            }   
        } catch (error) {
            console.error('There was a problem with the login request:', error);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen">
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center md:w-[60%] lg:w-[40%] xl:w-[30%] m-auto p-10 md:p-12 lg:p-16 border rounded-lg shadow-md space-y-8"
                >
                    <div className="space-y-5">
                        <h3 className="text-H2 text-center">
                            Masuk dengan email atau ID Anda
                        </h3>
                        <p className="text-B2 text-textGray text-center">
                            Masukkan email dan kata sandi yang telah terdaftar
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...methods.register("email", { required: true })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    {...methods.register("password", { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default LoginAdmin;
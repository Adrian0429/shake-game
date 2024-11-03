"use client"; // This is a client component
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import toast from "react-hot-toast"; // Assuming you are using react-hot-toast for notifications

const CreateNewsTaskPage = () => {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState<number | string>(""); // Use string for input, number for submission
  const [count, setCount] = useState<number | string>(""); // New state for Task_Count
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create task object
    const taskData = {
      title,
      reward: Number(reward), // Convert reward to a number
      count: Number(count), // Convert count to a number
    };

    try {
      const cookies = parseCookies();
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user/tasks/create",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (response.data.status) {
        toast.success("Task created successfully!");
        setTimeout(() => {
          router.push("/admin/news");
        }, 1500);
      } else {
        toast.error("Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating news task:", error);
      toast.error("An error occurred while creating the task.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Create News Task</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reward"
          >
            Reward
          </label>
          <input
            type="number"
            id="reward"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="count"
          >
            Task Count
          </label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>


        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateNewsTaskPage;

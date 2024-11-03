"use client"; // This is a client component
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import toast from "react-hot-toast"; // Assuming you are using react-hot-toast for notifications

const CreateFollowTaskPage = () => {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState<number | string>(""); // Use string for input, number for submission
  const [link, setLink] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create task object
    const taskData = {
      title,
      reward: Number(reward), // Convert reward to a number
      link,
    };

    try {
      const cookies = parseCookies();
      const response = await axios.post(
        "https://api2.fingo.co.id/api/user/tasks/follow/create",
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
          router.push("/admin/follow");
        }, 1500);
      } else {
        toast.error("Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating follow task:", error);
      toast.error("An error occurred while creating the task.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5">
      <h1 className="text-2xl font-bold mb-5">Create Follow Task</h1>
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
            htmlFor="link"
          >
            Task Link
          </label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
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

export default CreateFollowTaskPage;

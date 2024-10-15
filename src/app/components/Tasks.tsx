import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { MeUser } from "../constant/types";
import OffCanvasTask from "./offcanvas/OffCanvasTask";
import { LuYoutube } from "react-icons/lu";
import bg from "../../../public/Bg.png";
import shakeboy from "../../../public/shakerboy.png";

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

interface TasksProps {
  coin: number;
  userId: number;
}

const Tasks = ({ coin, userId }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [userDetails, setUserDetails] = useState<MeUser | null>(null);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get(
        "https://api2.fingo.co.id/api/task/user",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const cookies = parseCookies();
      const response = await axios.get("https://api2.fingo.co.id/api/user/me", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      console.log("Success Get User Data");
      setUserDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (userId && tasks.length === 0) {
      fetchUserData();
      fetchTasks();
      console.log("fetching data");
    }
  }, [userId, tasks.length]);

  const toggleOffcanvas = (task: Task) => {
    setSelectedTask(task);
    setIsOffcanvasVisible(!isOffcanvasVisible);
  };

  const onSuccess = () => {
    fetchTasks();
    fetchUserData();
    setIsOffcanvasVisible(!isOffcanvasVisible);
  };

  const groupedTasks = tasks.reduce((acc: { [key: string]: Task[] }, task) => {
    const category = task.category || "Generals";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {});

  // Move "Generals" to the top, and sort other categories alphabetically
  const orderedCategories = Object.keys(groupedTasks).sort((a, b) => {
    if (a === "Generals") return -1;
    if (b === "Generals") return 1;
    return a.localeCompare(b);
  });

  return (
    <div
      className="flex h-screen w-screen"
      style={{
        backgroundImage: `url(${bg.src})`,
        width: "100%",
      }}
    >
      <div className="flex flex-col h-[calc(100vh-4.5rem)] w-full items-center py-5">
        <div className="text-white w-full text-center space-y-4">
          <Image
            src={shakeboy}
            alt="shake"
            height={250}
            width={250}
            className="w-[50%] h-auto mx-auto"
          />
          <h1 className="text-H1">{userDetails?.coins} Coins !</h1>
          <h2 className="text-H3">Do the task, and claim the rewards!</h2>
        </div>

        <div className="w-[90%] h-[calc(100vh-13rem)] overflow-y-scroll mt-5 space-y-3">
          {orderedCategories.map((category) => (
            <div key={category}>
              <h3 className="text-xl text-white mb-3 w-full border-b border-slate-400">
                {category}
              </h3>

              {/* Render tasks for this category */}
              {groupedTasks[category].map((task) => (
                <div
                  key={task.id}
                  className="flex flex-row justify-between h-16 bg-[#232328] rounded-full px-5 py-1 items-center mb-3"
                >
                  <div className="flex flex-col text-white">
                    <p>{task.title}</p>
                    <p>+ {task.reward} Coins</p>
                  </div>

                  <div
                    onClick={() => toggleOffcanvas(task)}
                    className="w-24 h-8 bg-[#D5FF18] cursor-pointer select-none
                      active:translate-y-2  active:[box-shadow:0_0px_0_0_#ABC340,0_0px_0_0_#ffffff]
                      active:border-b-[0px]
                      transition-all duration-150 [box-shadow:0_5px_0_0_#ABC340,0_8px_0_0_#ffffff]
                      rounded-full  border-[1px] border-[#D5FF18] mb-3"
                  >
                    <LuYoutube className="w-full h-full text-black" />
                  </div>

                  {selectedTask && (
                    <OffCanvasTask
                      task={selectedTask}
                      isVisible={isOffcanvasVisible}
                      userId={userId}
                      onClose={() => {
                        onSuccess();
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

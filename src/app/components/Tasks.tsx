import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Task {
  task_id: string;
  title: string;
  link?: string;
}

interface TasksProps {
  userId: number; // Define the type of the prop
}

const Tasks = ({ userId }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://api2.fingo.co.id/api/user/tasks",
          {
            params: { tele_id: String(userId) },
          }
        );
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  return (
    <div className="w-full h-full py-20">
      <div className="flex flex-col gap-y-4 items-center">
        {userId}
        <h2 className="text-H1 dark:text-white">Daily Tasks</h2>
        {tasks.map((task) => (
          <div key={task.task_id} className="w-[80%]">
            <h2 className="text-H3 dark:text-white text-slate-900">
              {task.title}
            </h2>
            <div className="flex flex-row justify-between items-center bg-blue-500 rounded-lg w-full px-4 h-16 mt-2">
              <p className="text-S1 dark:text-white text-slate-900">
                {task.title}
              </p>
              {task.link && (
                <Link
                  href={task.link}
                  target="_blank"
                  className="text-S2 px-5 py-3 bg-blue-800 rounded-lg text-white dark:text-slate-900"
                >
                  GO
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;

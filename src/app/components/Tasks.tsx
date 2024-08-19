
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Follow Instagram",
    link: "https://instagram.com/_adriankaruna/",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the second task",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the third task",
    completed: false,
  },
];

const Tasks = () => {
  return (
    <div className="w-full h-full py-20">
      <div className="flex flex-col gap-y-4 items-center">
        <h2 className="text-H1 dark:text-white">Daily Tasks</h2>
        {tasks.map((task) => {
          return (
            <div key={task.id} className="w-[80%]">
              <h2 className="text-H3 dark:text-white text-slate-900">
                {task.title}
              </h2>
              <div className="flex flex-row justify-between items-center bg-blue-500 rounded-lg w-full px-4 h-16 mt-2">
                <p className="text-S1 dark:text-white text-slate-900">
                  {task.description}
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
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;

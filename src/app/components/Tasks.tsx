
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
    <div className="w-full h-full py-20 ">
      <div className="flex flex-col gap-y-4 items-center">
        <h2 className="text-H2">Daily Tasks</h2>

        {tasks.map((task) => {
          return (
            <div key={task.id} className="w-[80%]">
              <h3 className="text-H4">{task.title}</h3>
              <div className="flex flex-row justify-between items-center bg-blue-600 rounded-lg w-full px-4 h-16 mt-2">
                <p className="text-S2">{task.description}</p>
                {task.link && (
                  <Link
                    href={task.link}
                    target="_blank"
                    className="text-S2 px-5 py-3 bg-blue-700 rounded-lg"
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

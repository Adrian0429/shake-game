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

const TaskPage = () => {
  return (
    <div className="w-full h-full py-20 ">
      <div className="flex flex-col gap-y-4 items-center">
        <h2 className="text-H2">Daily Tasks</h2>
        
        {tasks.map((task) => { 
          return (
            <div key={task.id} className="w-[80%]">
              <h3 className="text-H4">{task.title}</h3>
              <div className="w-full flex flex-row justify-between bg-blue-300 p-4 rounded-lg">
                <p>{task.description}</p>
                {task.link && (
                  <Link href={task.link} target="_blank">
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

export default TaskPage;

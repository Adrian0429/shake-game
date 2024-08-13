"use client"
import { useEffect, useState, useRef } from "react";
import FooterNav from "../../components/Navigation/Footer";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Follow Instagram",
    link: "https://instagram.com/_adriankaruna",
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
      <div className="flex flex-col gap-y-4">
        <h2>Daily Tasks</h2>
        
        {tasks.map((task) => { 
          return (
            <div key={task.id} className="w-[80%]">
              <h3 className="text-H4">{task.title}</h3>
              <div className="w-full bg-blue-300">
                <p>{task.description}</p>
                <a href={task.link} target="_blank">
                  Go to task
                </a>
              </div>
            </div>
          );
        })}
        
      </div>
    </div>
  );
};

export default TaskPage;

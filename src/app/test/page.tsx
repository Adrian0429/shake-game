"use client";
import React, { useState } from 'react'
import ModalAllowComponent from '../components/Modal/ModalAllow';

export default function Testing() {
    const [isModalOpen, setIsModalOpen] = useState(true);

  const checkMotionPermission = async () => {
    alert("Permission granted");
    setIsModalOpen(false);
  };
  

  return (
    <div className="h-screen w-screen">
      <ModalAllowComponent
        username={"adrian"}
        daily_count={5}
        onAllowPermission={checkMotionPermission}
        isOpen={isModalOpen}
      />
    </div>
  );
}

// "use client";
// import React from 'react'
// import ModalAllowComponent from '../components/Modal/ModalAllow';

// const page = () => {
//     const [isModalOpen, setIsModalOpen] = React.useState(true);

//   const checkMotionPermission = async () => {
//     alert("Permission granted");
//     setIsModalOpen(false);
//   };
  

//   return (
//     <div className="h-screen w-screen">
//       <ModalAllowComponent
//         username={"adrian"}
//         daily_count={5}
//         onAllowPermission={checkMotionPermission}
//         isOpen={isModalOpen}
//       />
//     </div>
//   );
// }

// export default page
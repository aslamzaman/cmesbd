"use client";
import React from 'react';
import Image from "next/image";
import dashboard from "@/public/images/landing/landing.png";


const Home = ({ children }) => {



  return (
    <div className="w-full lg:w-3/4 mx-auto">
      <h1 className="w-full my-4 text-xl lg:text-3xl font-bold text-center text-blue-700">Welcome to CMESBD</h1>
      <Image src={dashboard} alt="dashboard" width={399.1} height={261.8} priority={true} className="w-full h-auto mx-auto" />
    </div>
  )
}

export default Home




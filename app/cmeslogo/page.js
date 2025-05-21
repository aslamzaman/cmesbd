"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextDt, TextBn, TextareaBn } from "@/components/Form";
import Image from "next/image";





const Cmeslogo = () => {




  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">CMES LOGO</h1>
        <p className="w-full mt-6 text-center text-gray-600">Download High Resolution (4k) CMES Logo</p>
      </div>

      <div className="px-6 md:px-8">
        <div className="w-full lg:w-1/2 mx-auto grid grid-cols-2 gap-6">
          
          <div className="w-full p-4 flex flex-col space-y-4 justify-center items-center">
            <p className="w-full text-center text-gray-600">Raster Image</p>
            <Image src="/images/cmes_logo/cmes_logo.png" width={3024} height={4683} alt="cmes logo png" className="w-full h-auto" />
            <a className="w-full text-center font-bold text-blue-800 hover:text-blue-600 hover:underline" href="/images/cmes_logo/cmes_logo.png" download="cmes_logo.png">PNG Download</a>
          </div>



          <div className="w-full p-4 flex flex-col space-y-4 justify-center items-center">
            <p className="w-full text-center text-gray-600">Vector Image</p>
            <Image src="/images/cmes_logo/cmes_logo.svg" width={3024} height={4683} alt="cmes logo png" className="w-full h-auto" />
            <a className="w-full text-center font-bold text-blue-800 hover:text-blue-600 hover:underline" href="/images/cmes_logo/cmes_logo.svg" download="cmes_logo.svg">SVG Download</a>
          </div>
        </div>

      </div>
    </>
  );

};
export default Cmeslogo;

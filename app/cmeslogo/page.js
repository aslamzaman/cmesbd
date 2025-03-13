"use client";
import React from "react";
import Image from "next/image";





const Cmeslogo = () => {




    const btnPng = () => {

        const url = "/images/cmes_logo/cmes_logo.png";
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cmes_logo.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }


    const btnSvg = () => {

        const url = "/images/cmes_logo/cmes_logo.svg";
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cmes_logo.svg';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    return (
        <>
            <div className="bg-gray-100 py-4 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-500 uppercase">CMES Logo (4K Size)</h1>
            </div>
            <p className="text-center text-xl text-green-800 underline underline-offset-8 decoration-2">(3024 (width) &times; 4683 (height) pixels)</p>

            <div className="w-fit flex space-x-8 mx-auto my-6">
                <div className="flex flex-col space-y-4">
                    <p className="text-center text-2xl text-blue-500">PNG</p>
                    <Image src="/images/cmes_logo/cmes_logo.png" width={3024} height={4683} alt="cmes_logo" className="w-[200px] h-auto" />
                    <button onClick={btnPng} className="text-center text-md text-blue-500 underline decoration-2">PNG Downlod</button>
                </div>
                <div className="flex flex-col space-y-4">
                    <p className="text-center text-2xl text-blue-500">SVG</p>
                    <Image src="/images/cmes_logo/cmes_logo.svg" width={3024} height={4683} alt="cmes_logo" className="w-[200px] h-auto" />
                    <button onClick={btnSvg} className="text-center text-md text-blue-500 underline decoration-2">SVG Downlod</button>
                </div>
            </div>
        </>
    )

}

export default Cmeslogo;

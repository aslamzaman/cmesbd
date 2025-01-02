"use client";
import React, { useState } from "react";
import { BtnSubmit, TextNum } from "@/components/Form";




const Inwordconverter = ({ Msg }) => {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [msg, setMsg] = useState("");


    const checkHandler = (e) => {
        e.preventDefault();
            const st = `http://103.48.16.132/echalan/details.php?challanNo=${num1}-${num2}`;
            window.open(st, "_blank");
    }


    return (
        <>
            <div className="w-full lg:w-1/2 mx-auto mt-10 border-2 border-gray-300 rounded-md shadow-md">
                <div className="w-full border-b-2 border-gray-300">
                    <h1 className="w-full text-xl lg:text-3xl py-4 font-bold text-center text-gray-500">Challan Verification</h1>
                    <p className="text-center text-red-700 py-4">{msg}</p>
                </div>

                <div className="w-full p-4 overflow-auto">
                    <form onSubmit={checkHandler}>
                        <div className="grid grid-cols-3 gap-2">
                            <TextNum Title="First Part" Id="num1" Change={e => setNum1(e.target.value)} Value={num1} />
                            <div className="col-span-2">
                                <TextNum Title="Second Part" Id="num2" Change={e => setNum2(e.target.value)} Value={num2} />
                            </div>
                        </div>
                        <div className="w-full flex justify-start">
                            <BtnSubmit Title="Submit" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

};
export default Inwordconverter;

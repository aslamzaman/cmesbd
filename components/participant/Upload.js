import React, { useState } from "react";
import { BtnEn } from "../Form";
import { Close } from "../Icons";


import { formatedDate } from "@/lib/utils";
import { setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";
import { excelDateToJSDate, jsonDataFromExcelSheet } from "@/lib/ColHelper";



const Upload = ({ message }) => {
    const [file, setFile] = useState(null);


    const [show, setShow] = useState(false);


    const showModal = () => {
        setShow(true);
    }




    const uploadHandler = async () => {
        if (file) {
            try {
                const response = await jsonDataFromExcelSheet(file, ["sl", "name", "dt", "mobile"]);
                const withId = response.map((item, i) => {
                    const numberDt = isNaN(item.dt);
                    const longDt = numberDt ? "1900-01-01" : excelDateToJSDate(item.dt);
                    //-----------------------------------------------------
                    const daysCalculation = (Date.now() - new Date(longDt).getTime()) / (1000 * 60 * 60 * 24 * 365);
                    const yrs = Math.round(daysCalculation);
                    const finalDt = yrs < 12 || yrs > 60 || numberDt ? "1900-01-01" : formatedDate(longDt);

                    //-------------------------------------------------
                    const mobileShotr = parseInt(item.mobile).toString();
                    const finalMobile = mobileShotr.length !== 10 || mobileShotr.charAt(0) !== '1' ? '999999999' : `${mobileShotr}`;
                    const id = Date.now()+"_"+ (i+1)
                    return {
                        ...item,
                        id: id,
                        dt: finalDt,
                        mobile: finalMobile
                    }
                })
                console.log(withId);
                await setDataToIndexedDB("participant", withId);
                message("Data loaded successfully");
                setShow(false);
            } catch (err) {
                console.log(err);
            }
        } else {
            message("Please select a file.");
            setShow(false);
        }
    }




    return (
        <>
            <div className={`fixed inset-0 py-16 bg-gray-900 ${show ? 'block' : 'hidden'}  bg-opacity-60 overflow-auto`}>
                <div className="w-11/12 md:w-8/12 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Upload File</h1>
                        <Close Click={() => { setShow(false); Msg("Data ready") }} Size="w-9 h-9" />
                    </div>

                    <div className="p-6 text-black">
                        <input type="file" onChange={(e) => { setFile(e.target.files[0]); }} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                    </div>


                    <div className="px-6 py-6 flex justify-end items-center border-t border-gray-300">
                        <BtnEn Title="Close" Click={() => { setShow(false); message("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white mr-1" />
                        <BtnEn Title="Upload" Click={uploadHandler} Class="bg-blue-600 hover:bg-blue-800 text-white" />
                    </div>
                </div>
            </div>
            <button onClick={showModal} className="w-7 h-7 rounded-full hover:bg-gray-200 mr-0.5 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
            </button>
        </>
    )
}
export default Upload;


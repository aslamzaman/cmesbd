import React, { useState } from "react";
import { BtnEn } from "../Form";
import { Close } from "../Icons";
import { setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";
import * as XLSX from 'xlsx';


const Upload = ({ message }) => {
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);


    const showModal = () => {
        setShow(true);
        setFile(null)
    }


    const convertCsvToJson = (csv) => {
        const lines = csv.split("\n"); // Trim and split into rows
        const dataRows = lines.slice(1);
        return dataRows.map((item, index) => {
            const values = item.split(";").map(value => value.trim());
            return {
                id: index + 1,
                name: values[0],
                date: values[1],
                mobile: values[2]
            }
        })
    }


    const uploadHandler = () => {
        if (!file) {
            message("Please select a file.");
            return;
        }

        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const workbook = XLSX.read(event.target.result, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const csvFile = XLSX.utils.sheet_to_csv(worksheet,{FS:";"});
              //  console.log(csvFile);
                const data = convertCsvToJson(csvFile);
                await setDataToIndexedDB("participant", data);
                message("Data loaded successfully");
                setShow(false);
            }
            reader.readAsArrayBuffer(file);
        } catch (err) {
            console.log(err);
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


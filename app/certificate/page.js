"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
require("@/public/fonts/Lobster-Regular-normal");
require("@/public/fonts/OpenSansCondensed-Light-normal");
import { BtnSubmit, DropdownEn, TextDt, TextEn, TextPw } from "@/components/Form";
import { formatedDateSlash, formatedDate } from "@/lib/utils";
import Loading from '@/components/Loading';



const jsonDataFromExcelSheet = (file, headerArray) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: headerArray });
            resolve(jsonData.slice(1));
        }
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    })
}



const Certificate = () => {
    const [stdData, setStdData] = useState([]);
    const [pw, setPw] = useState("");
    const [dt, setDt] = useState("");
    const [quart, setQuart] = useState("");
    const [msg, setMsg] = useState("Seclect an excel file");
    const [waitPage, setWaitPage] = useState(false);



    useEffect(() => {
        setDt(formatedDate(new Date()));
    }, [])


    const fileChangeHandler = async (e) => {
        try {
            const data = await jsonDataFromExcelSheet(e.target.files[0], ["sl", "name", "trade", "reg"]);
            setStdData(data);
        } catch (err) {
            console.log("Messages: " + err);
        }
    }


    const createPdfHanler = (e) => {
        e.preventDefault();
        const envPw = "zohurcmes";
        if (stdData.length < 1) {
            setMsg("Please select a xlsx file");
            return false;
        }

        if (pw !== envPw) {
            setMsg("The password is incorrect!");
            return false;
        }

        const doc = new jsPDF({
            orientation: 'l',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            floatPrecision: 16 // or "smart", default is 16
        });

        setMsg("Please wait...");
        setWaitPage(true);
        //  console.log(stdData);

        let i = 0;
        const myTimer = setInterval(() => {


            doc.addImage(`/images/certificate/Col_EWG_2023_2024_Yr_${quart}.png`, "PNG", 0, 0, 297, 210);

            doc.setFont("Lobster-Regular", "normal");
            doc.setFontSize(24);
            doc.text(`${stdData[i].name}`, 148, 88, null, null, "center");

            doc.setFont("OpenSansCondensed-Light", "normal");
            doc.setFontSize(14);
            doc.text("Registration no: " + stdData[i].reg, 148, 94.5, null, null, "center");

            doc.setFont("Lobster-Regular", "normal");
            doc.setFontSize(17);
            doc.text(`${stdData[i].trade}`, 162, 113, null, null, "center");
            // doc.text(`${period}`, 84, 110.5, null, null, "center");
            doc.setFontSize(16)
            doc.setFont("Lobster-Regular", "normal");

            doc.setFontSize(12);
            doc.text(`${stdData[i].sl}`, 66, 183);
            doc.text(`${formatedDateSlash(dt)}`, 196, 183);

            doc.addPage("a4", "l");

            i = i + 1;
            setMsg(`Page Created: ${i}`);
            if (i >= stdData.length) {
                clearInterval(myTimer);
                doc.deletePage((stdData.length + 1));
                setWaitPage(false);
                doc.save(Date.now() + ".pdf");
            }

        }, 500)
    }





    if (waitPage) {
        return <Loading message={msg} />
      }
    
    


    return (
        <>
            <div className="w-full my-[50px] flex flex-col items-center border border-gray-300 rounded-lg drop-shadow-lg bg-white z-50">
                <div className="w-full bg-gray-100 border-b rounded-t-lg">
                    <h1 className="py-2.5 text-center font-semibold text-[calc(1.40rem+0.3vw)]">CMES COL Certificate</h1>
                </div>
                <p className="py-1.5 text-start text-xs font-bold">{msg}</p>
                <form onSubmit={createPdfHanler} className="w-full p-2">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="mt-4">
                            <input type="file" onChange={fileChangeHandler} className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300 cursor-pointer" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        </div>

                        <TextPw Title="Password" Id="pw" Change={(e) => { setPw(e.target.value) }} Value={pw} Chr="10" />
                        <DropdownEn Title="Select Qurter" Id="quart" Change={(e) => { setQuart(e.target.value) }} Value={quart}>
                            <option value="1">Qurter-1</option>
                            <option value="2">Qurter-2</option>
                            <option value="3">Qurter-3</option>
                            <option value="4">Qurter-4</option>
                             <option value="5">Qurter-1/2024</option>
                            <option value="6">Qurter-2/2024</option>
                            <option value="7">Qurter-3/2024</option>
                        </DropdownEn>
                        <TextDt Title="Certificate Issue Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                    </div>
                    <BtnSubmit Title="Create Certificate" Class="bg-indigo-700 hover:bg-indigo-900 text-white" />
                </form>
                <a href="/images/certificate/certificate.xlsx" className="text-2xl py-4 underline">Format Download</a>
            </div>
        </>
    )
}

export default Certificate;
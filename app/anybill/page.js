"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextBn, TextDt } from "@/components/Form";
import Add from "@/components/anybill/Add";
import Edit from "@/components/anybill/Edit";
import Delete from "@/components/anybill/Delete";
import { jsPDF } from "jspdf";

require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";
import { inwordBangla, numberWithComma, formatedDate, formatedDateDot, sortArray } from "@/lib/utils";


const Anybill = () => {
    const [anybills, setAnybills] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [dt, setDt] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [staff, setStaff] = useState('');
    const [subject, setSubject] = useState('');
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const [staffData, anybillData] = await Promise.all([
                    getDataFromIndexedDB('staff'),
                    getDataFromIndexedDB('anybill')
                ]);
                console.log({ staffData, anybillData })
                const sortedData = staffData.sort((a, b) => sortArray(a.nameEn.toUpperCase(), b.nameEn.toUpperCase()));
                setStaffs(sortedData);
                //--------------------------------------------------------------------
                setAnybills(anybillData);
                //-----------------------------------------------------------------------
                const grandTotal = anybillData.reduce((t, c) => t + (parseFloat(c.no) * parseFloat(c.taka)), 0);
                setTotal(grandTotal);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
        setDt(formatedDate(new Date()));
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    const handleCreate = async (e) => {
        e.preventDefault();
        setWaitMsg('Please Wait...');

        if (anybills.length < 1) {
            setWaitMsg("No data to creating bkash.");
            return false;
        }

        try {
            setTimeout(() => {
                const doc = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                    putOnlyUsedFonts: true,
                    floatPrecision: 16 // or "smart", default is 16
                });

                //--------------------------------------------------------------------

                doc.addImage("/images/formats/anybill.png", "PNG", 0, 0, 210, 297);

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);
                doc.text(`${formatedDateDot(dt,true)}`, 100, 63, null, null, "left");
                doc.text(`${subject}`, 35, 75.75, { maxWidth: 162, align: 'left' });

                let y = 103;
                let dbTotal = 0;

                for (let i = 0; i < anybills.length; i++) {

                    let tk = parseFloat(anybills[i].taka);
                    let subTotal = parseFloat(anybills[i].taka) * parseFloat(anybills[i].no);

                    doc.text(`${i + 1}`, 30, y, null, null, "center");
                    doc.text(`${anybills[i].item}`, 42, y, null, null, "left");
                    doc.text(`${numberWithComma(tk,false)}/-`, 142, y, null, null, "right");
                    doc.text(`${anybills[i].no}`, 155, y, null, null, "right");

                    doc.text(`${numberWithComma(subTotal, false)}/-`, 183, y, null, null, "right");
                    dbTotal = dbTotal + subTotal;

                    y = y + 6;
                }

                doc.line(180, y - 3, 168, 188) // cross line
                console.log(dbTotal)
                let inwordTak = inwordBangla(parseInt(dbTotal));
                doc.text(`${inwordTak} UvKv gvÎ`, 58, 203, null, null, "left");
                doc.text(`${numberWithComma(dbTotal, false)}/-`, 183, 196, null, null, "right");
                doc.text(`${staff.split(",")[0]}`, 24, 234, null, null, "left");
                doc.text(`${staff.split(",")[1]}`, 24, 240, null, null, "left");

                //--------------------------------------------------------------------

                doc.save(new Date().toISOString() + "-Any-Bill.pdf");
                setWaitMsg('');
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Any Bill</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                <DropdownEn Title="Staff" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                                    {staffs.length ? staffs.map(staff => <option value={`${staff.nameBn},${staff.postBn}`} key={staff.id}>{staff.nameEn}</option>) : null}
                                </DropdownEn>
                                <TextBn Title="Subject (SutonnyMJ)" Id="subject" Change={e => setSubject(e.target.value)} Value={subject} Chr={200} />
                            </div>
                            <div className="w-full flex justify-start">
                                <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
                        <div className="px-4 lg:px-6 overflow-auto">
                            <p className="w-full text-sm text-red-700">{msg}</p>
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Item</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Nos.</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                        <th className="w-[100px] font-normal">
                                            <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                                <Add message={messageHandler} />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        anybills.length ? anybills.map(any => {
                                            return (
                                                <tr className="border-b border-gray-200 hover:bg-gray-100" key={any.id}>
                                                    <td className="text-center py-2 px-4 font-sutonnyN">{any.item}</td>
                                                    <td className="text-center py-2 px-4 font-sutonnyN">{any.no}</td>
                                                    <td className="text-center py-2 px-4 font-sutonnyN">{any.taka}</td>
                                                    <td className="flex justify-end items-center mt-1">
                                                        <Edit message={messageHandler} id={any.id} data={any} />
                                                        <Delete message={messageHandler} id={any.id} data={any} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            : null
                                    }

                                    <tr className="border-b border-gray-200 hover:bg-gray-100 font-bold">
                                        <td className="text-center py-2 px-4 font-sutonnyN">†gvU</td>
                                        <td className="text-center py-2 px-4 font-sutonnyN"></td>
                                        <td className="text-center py-2 px-4 font-sutonnyN">{total}</td>
                                        <td className="flex justify-end items-center mt-1"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Anybill;




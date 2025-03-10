"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

import Add from "@/components/tabill/Add";
import Edit from "@/components/tabill/Edit";
import Delete from "@/components/tabill/Delete";

import { DropdownEn, TextDt, BtnSubmit, TextNum } from "@/components/Form";

import { formatedDateDot, inwordBangla, numberWithComma,  sortArray, formatedDate } from "@/lib/utils";
import {  getDataFromIndexedDB, getValueFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";


require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");

const dtAr = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]


const Tabill = () => {
    const [tabills, setTabills] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [staffData, setStaffData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    const [staff, setStaff] = useState("");
    const [project, setProject] = useState("");
    const [dt1, setDt1] = useState("");
    const [da, setDa] = useState("");
    const [totalDay, setTotalDay] = useState("");

    const [total, setTotal] = useState("");


    useEffect(() => {

        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const [staffs, projects, tabills] = await Promise.all([
                    getDataFromIndexedDB("staff"),
                    getDataFromIndexedDB("project"),
                    getDataFromIndexedDB("tabill")
                ]);
                const sortedData = staffs.sort((a, b) => sortArray(a.nameEn, b.nameEn));
                setStaffData(sortedData);
                setProjectData(projects);
                //---------------------------------------

                setTabills(tabills);
                const result = tabills.reduce((t, c) => t + parseFloat(c.taka), 0);
                setTotal(result);
                //--------------------------------------------
                const taDatas = await getValueFromIndexedDB("taData");
                if (taDatas) {
                    setStaff(taDatas.staff);
                    setProject(taDatas.project);
                    setDt1(formatedDate(taDatas.dt1));
                    setDa(taDatas.da);
                    setTotalDay(taDatas.totalDay);
                } else {
                    setStaff("");
                    setProject("");
                    setDt1(formatedDate(new Date()));
                    setDa("");
                    setTotalDay("");
                }
                setWaitMsg('');
            } catch (err) {
                console.log(err);
            }
        }
        getData();

    }, [msg]);


    const msgHandler = (data) => {
        setMsg(data);
    }


    const handleCreate = async (e) => {
        e.preventDefault();

        if (tabills.length < 1) {
            setMsg("No data!!");
            return false;
        }

        const taData = { staff, project, dt1, da, totalDay };
        await setDataToIndexedDB("taData", taData);


        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });


        setWaitMsg('Please Wait...');
        // console.log(data);
        setTimeout(() => {
            //------------------------------------------------------
            doc.addImage("/images/formats/tabill.png", "PNG", 0, 0, 210, 297);
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(14);
            doc.text(`${staff.split(',')[0]}`, 75, 56, null, null, "center");
            doc.text(`${staff.split(',')[1]}`, 145, 56, null, null, "left");
            doc.text("mv‡m", 79, 64, null, null, "center"); // sase

            doc.setFont("times", "normal");
            doc.text(`${project}`, 168, 64, null, null, "center");
            doc.setFont("SutonnyMJ", "normal");
            doc.setFontSize(12);
            //----------------------------------------------------
            let y = 85;
            let total = 0;
            for (let i = 0; i < tabills.length; i++) {

                doc.text(`${formatedDateDot(tabills[i].dt, false)}`, 19.8, y, null, null, "center");
                doc.text(`${tabills[i].place1}`, 37.6, y, null, null, "center");
                doc.text(`${tabills[i].tm1}`, 53.5, y, null, null, "center");
                doc.text(`${tabills[i].place2}`, 69.6, y, null, null, "center");
                doc.text(`${tabills[i].tm2}`, 86, y, null, null, "center");
                doc.text(`${tabills[i].cause}`, 121.6, y, null, null, "center");
                doc.text(`${tabills[i].vehicle}`, 156.5, y, null, null, "center");
                doc.text(`${numberWithComma(parseFloat(tabills[i].taka), false)}/-`, 181, y, null, null, "right");
                total = total;
                y += 5;
            }
            //----------------------------------------------------

            const startDt = tabills[0].dt;
            const endDt = tabills[tabills.length - 1].dt;
            const totalDaTaka = parseFloat(totalDay) * parseFloat(da);
            const totalLocalTaka = tabills.reduce((t, c) => t + parseFloat(c.taka), 0);
            const gtTaka = totalDaTaka + parseFloat(totalLocalTaka);


            doc.text(`${formatedDateDot(startDt, false)} †_‡K ${formatedDateDot(endDt, false)} ZvwiL = ${totalDay} w\`b * ${da} `, 66.5, 228, null, null, "left");
            doc.text(`${numberWithComma(totalDaTaka, false)}/-`, 181, 228, null, null, "right");

            // grand total numeric
            doc.text(`${numberWithComma(gtTaka, false)}/-`, 181, 235, null, null, "right");


            // let t = parseInt(total).toString();
            doc.text(`${inwordBangla(gtTaka)} UvKv gvÎ`, 47.5, 235, null, null, "left");
            doc.text(`${formatedDateDot(dt1, false)}`, 177.5, 271, null, null, "left");

            //------------------------------------------------------
            doc.save(new Date().toISOString() + "_TA_Bill.pdf");
            setWaitMsg('');
        }, 0);


    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className='text-center text-2xl font-bold'>Unit TA Bill</h1>
                <p className="text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                                    {staffData.length ? staffData.map(staff => <option value={`${staff.nameBn},${staff.postBn}`} key={staff.id}>{staff.nameEn}</option>) : null}
                                </DropdownEn>
                                <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                                    {projectData.length ? projectData.map(project => <option value={project.name} key={project.id}>{project.name}</option>) : null}
                                </DropdownEn>
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt1(e.target.value) }} Value={dt1} />
                                <TextNum Title="DA Taka" Id="da" Change={(e) => { setDa(e.target.value) }} Value={da} />
                                <TextNum Title="Total Tour Days" Id="da" Change={(e) => { setTotalDay(e.target.value) }} Value={totalDay} />
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
                                        <th className="text-center border-b border-gray-200 py-2">Date</th>
                                        <th className="text-start border-b border-gray-200 pl-4 py-2">From</th>
                                        <th className="text-start border-b border-gray-200 pl-4 py-2">Where</th>
                                        <th className="text-center border-b border-gray-200 py-2">Vehicle</th>
                                        <th className="text-end border-b border-gray-200 pr-4 py-2">Taka</th>
                                        <th className="text-start border-b border-gray-200 pl-4 py-2">Cause</th>
                                        <th className="w-[100px] font-normal">
                                            <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                                                <Add message={msgHandler} />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tabills.length
                                            ? tabills.map((ta) => {
                                                return (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={ta.id}>
                                                        <td className="text-center py-2 font-sutonnyN">{ta.dt}</td>
                                                        <td className="text-start py-2 pl-4 font-sutonnyN">{ta.place1} ({ta.tm1})</td>
                                                        <td className="text-start py-2 pl-4 font-sutonnyN">{ta.place2} ({ta.tm2})</td>
                                                        <td className="text-center py-2 font-sutonnyN">{ta.vehicle}</td>
                                                        <td className="text-end py-2 pr-4 font-sutonnyN">{numberWithComma(ta.taka,false)}/-</td>
                                                        <td className="text-start py-2 pl-4 font-sutonnyN">{ta.cause}</td>
                                                        <td className="flex justify-end items-center mt-1">
                                                            <Edit message={msgHandler} id={ta.id} data={ta} />
                                                            <Delete message={msgHandler} id={ta.id} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                    }
                                    <tr className="border-b border-gray-200 font-bold">
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-end py-2 pr-4">{numberWithComma(total, false)}/-</td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="flex justify-end items-center mt-1">
                                        </td>
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
export default Tabill;

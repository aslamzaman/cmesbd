"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Add from "@/components/localta/Add";
import Edit from "@/components/localta/Edit";
import Delete from "@/components/localta/Delete";

import { DropdownEn, TextDt, TextBn, BtnSubmit, TextNum } from "@/components/Form";
import { formatedDate, inwordBangla, sortArray } from "@/lib/utils";
import { getDataFromIndexedDB, getValueFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");

const LocalTaCreation = ({ doc }, data) => {
    const { localtas, staff, subject, project, dt, tk } = data;

    doc.addImage("/images/formats/localtasingle.png", "PNG", 0, 0, 210, 297);
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(`${project}`, 181, 10, null, null, "center");
    doc.line(165, 11, 197, 11);
    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(14);
    //----------------------------------------------------
    let y = 67;
    let total = 0;
    for (let i = 0; i < localtas.length; i++) {
        let tick = localtas[i].vehicle;
        let x = 0;
        let x1 = 0;
        let x2 = 0;

        if (tick === "evm") {
            x = 105;
            x1 = 130;
            x2 = 150;
        } else if (tick === "wmGbwR") {
            x = 128;
            x1 = 107;
            x2 = 150;
        } else if (tick === "wi·v") {
            x = 148;
            x1 = 130;
            x2 = 107;
        }
        doc.text(`${localtas[i].place1}`, 13, y, null, null, "left");
        doc.text(`${localtas[i].t1}`, 48.5, y, null, null, "center");

        doc.text(`${localtas[i].place2}`, 56, y, null, null, "left");
        doc.text(`${localtas[i].t2}`, 92, y, null, null, "center");

        doc.addImage("/images/tick_mark/tick.png", "PNG", x, y - 4, 4.25, 4.25);
        doc.text(`-`, x1, y, null, null, "center");
        doc.text(`-`, x2, y, null, null, "center");

        doc.text(`${parseFloat(localtas[i].taka).toFixed(2)}`, 195, y, null, null, "right");
        total = total + parseFloat(localtas[i].taka);
        y = y + 6;
    }
    if (parseFloat(tk) > 0) {
        doc.text("`ycy‡ii Lvevi", 13, y, null, null, "left");
        doc.text(`${parseFloat(tk).toFixed(2)}`, 195, y, null, null, "right");
    }
    const totalTaka = total + parseFloat(tk);
    doc.text(`${totalTaka.toFixed(2)}`, 195, 113, null, null, "right");
    let t = parseInt(totalTaka).toString();
    doc.text(`${inwordBangla(t)} UvKv gvÎ`, 39, 113.6, null, null, "left");


    doc.text(`${staff}`, 97, 35.6, null, null, "center");
    doc.text(`${formatedDate(dt)}`, 178, 35, null, null, "center");
    doc.text("mv‡m", 178, 44, null, null, "center");
    doc.text(`${subject}`, 89, 44, null, null, "center");

}


const Localta = () => {
    const [localtas, setLocaltas] = useState([]);
    const [msg, setMsg] = useState("Data ready");
    const [waitMsg, setWaitMsg] = useState("");

    const [staffs, setStaffs] = useState([]);
    const [projectData, setProjectData] = useState([]);

    const [staff, setStaff] = useState("");
    const [project, setProject] = useState("");
    const [subject, setSubject] = useState("");
    const [dt, setDt] = useState("");
    const [tk, setTk] = useState("");

    const [total, setTotal] = useState("");



    useEffect(() => {
        setDt(formatedDate(new Date()));
        setTk('0');

        const getData = async () => {
            setWaitMsg('Please Wait...');
            try {
                const [staffs, projects] = await Promise.all([
                    getDataFromIndexedDB("staff"),
                    getDataFromIndexedDB("project")
                ]);

                const sortedData = staffs.sort((a, b) => sortArray(a.nameEn, b.nameEn));
                setStaffs(sortedData);
                setProjectData(projects);
                //------------------------------------------------------
                const data = await getDataFromIndexedDB("localta");
                setLocaltas(data);
                const result = data.reduce((t, c) => t + parseFloat(c.taka), 0);
                setTotal(result);
                //-------------------------------------------
                const localTaData = await getValueFromIndexedDB('localTaData');
                if (localTaData) {
                    setStaff(localTaData.staff);
                    setProject(localTaData.project);
                    setSubject(localTaData.subject);
                    setTk(localTaData.tk);
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

        if (localtas.length < 1) {
            setMsg("No data!!");
            return false;
        }

        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
            floatPrecision: 16
        });

        const localTaData = {
            staff: staff,
            subject: subject,
            project: project,
            tk: tk
        }
        await setDataToIndexedDB('localTaData', localTaData); // save for left data
        //--------------------------------------------------------------

        const data = {
            localtas: localtas,
            staff: staff,
            subject: subject,
            project: project,
            dt: dt,
            tk: tk
        }
        setWaitMsg('Please Wait...');

        setTimeout(() => {
            LocalTaCreation({ doc }, data);
            doc.line(0, 148.5, 10, 148.5);
            doc.line(100, 148.5, 110, 148.5);
            doc.line(200, 148.5, 210, 148.5);
            doc.save(new Date().toISOString() + "_Local_TA_Bill.pdf");
            setWaitMsg('');
        }, 0);
    }



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Local TA</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
                    <div className="w-full border-2 p-4 shadow-md rounded-md">
                        <form onSubmit={handleCreate}>
                            <div className="grid grid-cols-1 gap-2 my-2">
                                <DropdownEn Title="Staff Name" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                                    {staffs.length ? staffs.map(staff => <option value={`${staff.nameBn}, ${staff.postBn}`} key={staff.id}>{staff.nameEn}</option>) : null}
                                </DropdownEn>
                                <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                                    {projectData.length ? projectData.map(project => <option value={project.name} key={project.id}>{project.name}</option>) : null}
                                </DropdownEn>
                                <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
                                <TextBn Title="Subject (SutonnyMJ)" Id="subject" Change={(e) => { setSubject(e.target.value) }} Value={subject} Chr="150" />
                                <TextNum Title="Lunch Taka" Id="tk" Change={(e) => { setTk(e.target.value) }} Value={tk} />
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
                                        <th className="text-start border-b border-gray-200 py-2">Start</th>
                                        <th className="text-center border-b border-gray-200 py-2">Time</th>
                                        <th className="text-start border-b border-gray-200 py-2">End</th>
                                        <th className="text-center border-b border-gray-200 py-2">Time</th>
                                        <th className="text-center border-b border-gray-200 py-2">Vehicle</th>
                                        <th className="text-end border-b border-gray-200 py-2">Taka</th>
                                        <th className="font-normal text-start flex justify-end mt-1">
                                            <Add message={msgHandler} />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        localtas.length
                                            ? localtas.map((localta) => {
                                                return (
                                                    <tr className="border-b border-gray-200 hover:bg-gray-100" key={localta.id}>
                                                        <td className="text-start py-2 px-4 font-sutonnyN">{localta.place1}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{localta.t1}</td>
                                                        <td className="text-start py-2 px-4 font-sutonnyN">{localta.place2}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{localta.t2}</td>
                                                        <td className="text-center py-2 px-4 font-sutonnyN">{localta.vehicle}</td>
                                                        <td className="text-end py-2 px-4 font-sutonnyN">{localta.taka}</td>
                                                        <td className="flex justify-end items-center mt-1">
                                                            <Edit message={msgHandler} id={localta.id} data={localta} />
                                                            <Delete message={msgHandler} id={localta.id} data={localta} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : null
                                    }
                                    <tr className="border-b border-gray-200 font-bold">
                                        <td className="text-start py-2 px-4">Total</td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-center py-2 px-4"></td>
                                        <td className="text-start py-2 px-4"></td>
                                        <td className="text-end py-2 px-4 font-sutonnyN">{total}</td>
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
export default Localta;

"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/staff/Add";
import Edit from "@/components/staff/Edit";
import Delete from "@/components/staff/Delete";
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";
import { sortArray } from "@/lib/utils";


const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("staff");
                const sortStaff = data.sort((a, b) => sortArray(a.nameEn.toUpperCase(), b.nameEn.toUpperCase()));
              //  console.log(sortStaff);
                setStaffs(sortStaff);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }




    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Staff</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>

            <div className="w-full border-2 border-gray-200 p-4 shadow-md rounded-md">
                <div className="w-full overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                                <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="text-start border-b border-gray-200 px-4 py-2">Post</th>
                                <th className="text-center border-b border-gray-200 px-4 py-2">Gender</th>
                                <th className="text-start border-b border-gray-200 px-4 py-2">Address</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end items-center pr-2.5 font-normal">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                staffs.length ? staffs.map((staff, i) => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={staff.id}>
                                            <td className="text-center py-2 px-4">{i + 1}</td>
                                            <td className="text-start py-2 px-4">{staff.nameEn}<br /><span className="font-sutonnyN">{staff.nameBn}</span></td>
                                            <td className="text-start py-2 px-4">{staff.postEn}<br /><span className="font-sutonnyN">{staff.postBn}</span></td>
                                            <td className="text-center py-2 px-4">{staff.gender}</td>
                                            <td className="text-start py-2 px-4">{staff.address}<br />{staff.mobile}</td>
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={staff.id} data={staff} />
                                                <Delete message={messageHandler} id={staff.id} data={staff} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Staff;


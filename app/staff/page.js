"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/staff/Add";
import Edit from "@/components/staff/Edit";
import Delete from "@/components/staff/Delete";
import { getDataFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";
import { sortArray } from "@/lib/utils";

const staffData = [
    {
        "id": "1733759251576",
        "nameEn": "Md. Omar Faruque Haider",
        "nameBn": "†gv: Igi dviæK nvq`vi",
        "gender": "Male",
        "postEn": "Executive Director",
        "postBn": "wbe©vnx cwiPvjK",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759260288",
        "nameEn": "Apurba Roy",
        "nameBn": "Ac~e© ivq",
        "gender": "Male",
        "postEn": "Deputy Project Coordinator",
        "postBn": "†WcywU cÖ‡R± †Kv-AwW©‡bUi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759268600",
        "nameEn": "Sk. Shamsuzzaman",
        "nameBn": "†kL mvgQy¾vgvb",
        "gender": "Male",
        "postEn": "Senior Program Manager",
        "postBn": "wmwbqi †cÖvMÖvg g¨v‡bRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759278392",
        "nameEn": "Md. Mofigul Huq",
        "nameBn": "†gvt gwdRyj nK",
        "gender": "Male",
        "postEn": "Program Manager",
        "postBn": "†cÖvMÖvg g¨v‡bRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759288576",
        "nameEn": "Aslam Zaman",
        "nameBn": "Avmjvg Rvgvb",
        "gender": "Male",
        "postEn": "Senior Program Organizer",
        "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "01720025151"
    },
    {
        "id": "1733759300600",
        "nameEn": "Md. Zohurul Haque",
        "nameBn": "†gvt Rûiæj nK",
        "gender": "Male",
        "postEn": "Senior Program Organizer",
        "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759311904",
        "nameEn": "Md. Abul Kashem",
        "nameBn": "†gv: Aveyj Kv‡mg",
        "gender": "Male",
        "postEn": "Senior Program Organizer",
        "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759321567",
        "nameEn": "Gita Mitra",
        "nameBn": "MxZv wgÎ",
        "gender": "Female",
        "postEn": "Senior Program Organizer",
        "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759332543",
        "nameEn": "Dewan Emrul Kayes",
        "nameBn": "†`Iqvb Bgiæj Kv‡qm",
        "gender": "Male",
        "postEn": "Senior Program Organizer",
        "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759342943",
        "nameEn": "Amit Kumare Mohury",
        "nameBn": "AwgZ Kzgvi gûix",
        "gender": "Male",
        "postEn": "Program Organizer",
        "postBn": "†cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759352087",
        "nameEn": "Zakia Akter",
        "nameBn": "RvwKqv Av³vi",
        "gender": "Female",
        "postEn": "Program Organizer",
        "postBn": "†cÖvMÖvg AM©vbvBRvi",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759362399",
        "nameEn": "Md. Abdur Rahman",
        "nameBn": "†gv: Avãyi ingvb",
        "gender": "Male",
        "postEn": "Program Organizer(Inc)",
        "postBn": "wcI (BbPvR©)",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759376087",
        "nameEn": "Mohammad Rejaul Karim",
        "nameBn": "†gvnv¤§` †iRvDj Kwig",
        "gender": "Male",
        "postEn": "Program Organizer(Inc)",
        "postBn": "wcI (BbPvR©)",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759385479",
        "nameEn": "Al-Amin Hossain",
        "nameBn": "Avj Avwgb †nv‡mb",
        "gender": "Male",
        "postEn": "Program Assistant",
        "postBn": "†cÖvMÖvg G¨vwm÷¨v›U",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759393831",
        "nameEn": "Md. Tuhin Akter",
        "nameBn": "†gv: Zzwnb Av³vi",
        "gender": "Male",
        "postEn": "Program Assistant",
        "postBn": "†cÖvMÖvg G¨vwm÷¨v›U",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759401215",
        "nameEn": "Md. Liton Patuary",
        "nameBn": "†gvt wjUb cv‡Uvqvix",
        "gender": "Male",
        "postEn": "General Assistant",
        "postBn": "mvavib mnKvix",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759411647",
        "nameEn": "Md. Jasim Uddin",
        "nameBn": "†gv: Rwmg DwÏb",
        "gender": "Male",
        "postEn": "General Assistant",
        "postBn": "mvavib mnKvix",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759422559",
        "nameEn": "Md. Abul Bashar",
        "nameBn": "†gv: Aveyj evkvi",
        "gender": "Male",
        "postEn": "DRIVER",
        "postBn": "Mvox PvjK",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759431295",
        "nameEn": "Md. Jamal Uddin",
        "nameBn": "†gv: Rvgvj DwÏb",
        "gender": "Male",
        "postEn": "DRIVER",
        "postBn": "Mvox PvjK",
        "address": "Address",
        "mobile": "123456789"
    },
    {
        "id": "1733759441695",
        "nameEn": "Ms. Marzina Khatun",
        "nameBn": "†gvQv: gwR©bv LvZzb",
        "gender": "Female",
        "postEn": "CLEANER",
        "postBn": "cwi”QbœZv Kg©x",
        "address": "Address",
        "mobile": "123456789"
    }
];


const Staff = () => {
    const [staffs, setStaffs] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("staff");
                if (data.length > 0) {
                    const sortStaff = data.sort((a,b)=> sortArray(a.nameEn.toUpperCase(), b.nameEn.toUpperCase())) ;
                    console.log(sortStaff);
                    setStaffs(sortStaff);
                } else {
                    await setDataToIndexedDB('staff', staffData);
                    setStaffs(staffData);
                }

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

            <div className="w-full lg:w-3/4 mx-auto border-2 border-gray-200 p-4 shadow-md rounded-md">
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
                                staffs.length ? staffs.map((staff,i) => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={staff.id}>
                                            <td className="text-center py-2 px-4">{i+1}</td>
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


"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/receiver/Add";
import Edit from "@/components/receiver/Edit";
import Delete from "@/components/receiver/Delete";
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";


const Receiver = () => {
    const [receivers, setReceivers] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("receiver");
                const result = data.sort((a, b) => parseInt(b.id) > parseInt(a.id) ? 1 : -1);
                setReceivers(result);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Receiver</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full mx-auto border-2 border-gray-200 p-4 shadow-md rounded-md">
                <div className="w-full overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Identify</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Name</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Bank</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Account</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Branch</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Routing</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Thana</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">District</th>
                                    <th className="text-center border-b border-gray-200 px-4 py-2">Mobile</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end items-center pr-2.5 font-normal">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                receivers.length ? receivers.map(receiver => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={receiver.id}>
                                                <td className="text-center py-2 px-4">{receiver.identify}</td>
                                                <td className="text-center py-2 px-4">{receiver.name}</td>
                                                <td className="text-center py-2 px-4">{receiver.bank}</td>
                                                <td className="text-center py-2 px-4">{receiver.account}</td>
                                                <td className="text-center py-2 px-4">{receiver.branch}</td>
                                                <td className="text-center py-2 px-4">{receiver.routing}</td>
                                                <td className="text-center py-2 px-4">{receiver.thana}</td>
                                                <td className="text-center py-2 px-4">{receiver.district}</td>
                                                <td className="text-center py-2 px-4">{receiver.mobile}</td>                                            
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={receiver.id} data={receiver} />
                                                <Delete message={messageHandler} id={receiver.id} data={receiver} />
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

export default Receiver;
  

"use client";
import React, { useState, useEffect } from "react";
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";
import { sortArray } from "@/lib/utils";



const Talist = () => {
    const [tas, setTas] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("ta");
                const list = data.sort((a, b) => sortArray(a.unit.toUpperCase(), b.unit.toUpperCase()));
                setTas(list);
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, []);



    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">TA Taka</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>


            <div className="w-full overflow-auto border border-gray-400 shadow-lg rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-300 bg-gray-300">
                            <th className="py-2 text-center">SL</th>
                            <th className="py-2 text-start pl-4">Unit Name</th>
                            <th className="py-2 text-end pr-4">Taka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tas.map((ta, i) => (
                            <tr className="border-b border-gray-300" key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-start pl-4">{ta.unit}</td>
                                <td className="text-end pr-4">{ta.tk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Talist;


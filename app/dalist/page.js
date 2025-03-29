"use client";
import React, { useState, useEffect } from "react";
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";
import { sortArray } from "@/lib/utils";


const Dalist = () => {
    const [das, setDas] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("da");
                const list = data.sort((a, b) => sortArray(a.post.toUpperCase(), b.post.toUpperCase()));
                setDas(list);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">DA Taka</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>

            <div className="w-full overflow-auto border border-gray-400 shadow-lg rounded-lg">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-300 bg-gray-300">
                            <th className="py-2 text-center">SL</th>
                            <th className="py-2 text-start pl-4">Post</th>
                            <th className="py-2 text-end pr-4">Taka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {das.map((da, i) => (
                            <tr className="border-b border-gray-300" key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-start pl-4">{da.post}</td>
                                <td className="text-end pr-4">{da.tk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Dalist;


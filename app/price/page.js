"use client";
import React, { useState, useEffect } from "react";
import Edit from "@/components/price/Edit";
import { getDataFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const priceData = [
    {
        "id": "2ihLY7ZNyJgYKT3fO03v",
        "name": "Rod",
        "taka": "140"
    },
    {
        "id": "4wIhMnVTz4T63tuiNl5o",
        "name": "Tiles",
        "taka": "80"
    },
    {
        "id": "7sr2LdUOcYRCuWzeDvaF",
        "name": "Labor",
        "taka": "400"
    },
    {
        "id": "AXc2dF5VYHRVc0KtW5i7",
        "name": "Brick",
        "taka": "12"
    },
    {
        "id": "BPdiFFWadoXdzVhBg9tj",
        "name": "Flatbar",
        "taka": "120"
    },
    {
        "id": "PoYjiI0qdpXEPpHSvbmx",
        "name": "Khoa",
        "taka": "80"
    },
    {
        "id": "SFlvASnMa3RjbPgzz0Tw",
        "name": "Sand",
        "taka": "20"
    },
    {
        "id": "SXTILtVdWvOfdubnzuKn",
        "name": "Mason",
        "taka": "600"
    },
    {
        "id": "aj4THFRGdOZjs0QNPlrF",
        "name": "Cement",
        "taka": "550"
    },
    {
        "id": "mtgAaRyWBPxCOLjBXHn4",
        "name": "Angel Bar",
        "taka": "125"
    },
    {
        "id": "s62d8HMIXkC2Wh2CtNVd",
        "name": "Paint",
        "taka": "1500"
    }
];

const Price = () => {
    const [prices, setPrices] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("price");
                if (data.length > 0) {
                    setPrices(data);
                } else {
                    await setDataToIndexedDB('price', priceData);
                    setPrices(priceData);
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
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Price</h1>
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
                                <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end items-center pr-2.5 font-normal">
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                prices.length ? prices.map((price,i) => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={price.id}>
                                            <td className="text-center py-2 px-4">{i+1}</td>
                                            <td className="text-start py-2 px-4">{price.name}</td>
                                            <td className="text-center py-2 px-4">{price.taka}</td>
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={price.id} data={price} />
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

export default Price;


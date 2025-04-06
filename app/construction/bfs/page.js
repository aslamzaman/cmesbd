"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, TextEn, DropdownEn } from "@/components/Form";
import { numberWithComma } from "@/lib/utils";
import { evaluate } from 'mathjs';
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";

const Brickflatsolling = () => {
    const [waitMsg, setWaitMsg] = useState("");
    // form
    const [w, setW] = useState("100");
    const [sft, setSft] = useState('1');

    // price
    const [brickPrice, setBrickPrice] = useState(0);
    const [sandPrice, setSandPrice] = useState(0);
    const [sandRate, setSandRate] = useState(0);

    // quantity
    const [brickQt, setBrickQt] = useState("0");
    const [sandQt, setSandQt] = useState("0");



    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const response = await getDataFromIndexedDB('price');
                console.log(response)
                const brickPrice = response.find(brick => brick.id === "AXc2dF5VYHRVc0KtW5i7");
                const sandPrice = response.find(sand => sand.id === "SFlvASnMa3RjbPgzz0Tw");
                console.log({brickPrice,sandPrice});
                setBrickPrice(brickPrice.taka);
                setSandPrice(sandPrice.taka);
                setWaitMsg('');
            } catch (error) {
                console.error("Error loading prices:", error);
            }
        };
        load();
    }, [])


    const resultHandler = (e) => {
        e.preventDefault();
        const extraOperator = w.slice(- 1);
        if (extraOperator === "+" || extraOperator === "-") {
            setWaitMsg(" *Type error!");
            return false;
        }
        setWaitMsg(" ");

        
        let x = evaluate(w);
        let brick = 0;
        let sand = 0;
        let sandRate = 0;



        if (sft === "1") {
            brick = parseFloat(x) * 3;
            sand = parseFloat(x) * 0.05;
            sandRate = parseFloat(sandPrice);

        }
        else {
            brick = parseFloat(x) * 3 * 10.76;
            sand = (parseFloat(x) * 0.05 * 10.76) / 35.31;
            sandRate = parseFloat(sandPrice) * 35.31;
        }


        setBrickQt(brick.toFixed(2));
        setSandQt(sand.toFixed(2));
        setSandRate(sandRate);

    }



    return (

        <div className="w-full md:w-1/2 mx-auto my-10 border-2 border-gray-300 rounded-md shadow-md duration-300">

            <div className="py-2 border-b border-gray-300">
                <h1 className="text-center text-xl font-bold text-blue-600">Brick Flat Solling</h1>
                <p className="text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div>
            <div className="w-full p-4 flex flex-col">
                <form onSubmit={resultHandler}>
                    <div className="w-full grid grid-cols-1 gap-y-2">

                        <div className="w-full grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <TextEn Title="Total Works" Id="w" Change={(e) => { setW(e.target.value) }} Value={w} Chr="150" />
                            </div>
                            <DropdownEn Title="Option" Id="cft" Change={(e) => { setSft(e.target.value) }} Value={sft}>
                                <option value="0">M2</option>
                                <option value="1">SFT</option>
                            </DropdownEn>
                        </div>
                    </div>
                    <BtnSubmit Title="Calculate" Class="bg-blue-700 hover:bg-blue-900 text-white w-32" />
                </form>

                <div className="w-full p-4 my-2 bg-yellow-50 border rounded-md overflow-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2">
                                <th>Sl</th>
                                <th className="text-start">Item</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Unit</th>
                                <th className="text-end">Rate</th>
                                <th className="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td>Brick</td>
                                <td className="text-end">{brickQt}</td>
                                <td className="text-end">nos</td>
                                <td className="text-end">{parseFloat(brickPrice).toFixed(2)}</td>
                                <td className="text-end">{numberWithComma(brickQt * brickPrice)}</td>
                            </tr>

                            <tr>
                                <td className="text-center">3</td>
                                <td>Sand</td>
                                <td className="text-end">{sandQt}</td>
                                <td className="text-end">{sft === '1' ? 'cft' : 'm3'}</td>
                                <td className="text-end">{parseFloat(sandRate).toFixed(2)}</td>
                                <td className="text-end">{numberWithComma(sandQt * sandRate)}</td>
                            </tr>

                            <tr className="font-bold border-t-2">
                                <td></td>
                                <td>Total</td>
                                <td className="text-end"></td>
                                <td className="text-end"></td>
                                <td className="text-end"></td>
                                <td className="text-end">{numberWithComma((brickQt * brickPrice) + (sandQt * sandRate))}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div >

    );
};

export default Brickflatsolling;

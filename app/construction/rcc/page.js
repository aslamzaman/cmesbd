"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, TextNum, DropdownEn, TextEn } from "@/components/Form";
import { numberWithComma } from "@/lib/utils";
import { evaluate } from 'mathjs';
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";



const Rccwork = () => {
    const [waitMsg, setWaitMsg] = useState("");
    // form
    const [w, setW] = useState("100");
    const [cft, setCft] = useState('1');
    const [r1, setR1] = useState('1');
    const [r2, setR2] = useState('2');
    const [r3, setR3] = useState('4');
    const [rod, setRod] = useState('1.5');

    // price
    const [cementPrice, setCementPrice] = useState(0);
    const [sandPrice, setSandPrice] = useState(0);
    const [khoaPrice, setKhoaPrice] = useState(0);
    const [rodPrice, setRodPrice] = useState(0);
    const [khoaRate, setKhoaRate] = useState(0);
    const [sandRate, setSandRate] = useState(0);


    // quantity
    const [cementQt, setCementQt] = useState("0");
    const [khoaQt, setKhoaQt] = useState("0");
    const [sandQt, setSandQt] = useState("0");
    const [rodQt, setRodQt] = useState("0");
    const [totalTaka, setTotalTaka] = useState(0);


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const response = await getDataFromIndexedDB('price');
                console.log(response);
              
                const sandPrice = response.find(sand => sand.id === "SFlvASnMa3RjbPgzz0Tw");
                const cementPrice = response.find(cement => cement.id === "aj4THFRGdOZjs0QNPlrF");    
                const khoaPrice = response.find(khoa => khoa.id === "PoYjiI0qdpXEPpHSvbmx"); 
                const rodPrice = response.find(rod => rod.id === "2ihLY7ZNyJgYKT3fO03v");

                setCementPrice(cementPrice.taka);
                setSandPrice(sandPrice.taka);
                setKhoaPrice(khoaPrice.taka);
                setRodPrice(rodPrice.taka);
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
        let cement = 0;
        let sand = 0;
        let khoa = 0;
        let rd = 0;
        let khoaR = 0;
        let sandR = 0;


        let newW = parseFloat(x) * 1.5;
        let r = parseFloat(r1) + parseFloat(r2);

        if (cft === "1") {
            cement = ((newW / r) * parseFloat(r1)) / 1.25;
            sand = (newW / r) * parseFloat(r2);
            khoa = (newW / r) * parseFloat(r3);
            sandR = parseFloat(sandPrice);
            khoaR = parseFloat(khoaPrice);
            rd = x * (parseFloat(rod) / 100) * 222.5056689342404;
        }
        else {
            cement = ((newW / r) * parseFloat(r1) * 35.3147) / 1.25;
            sand = (newW / r) * parseFloat(r2);
            khoa = (newW / r) * parseFloat(r3);
            sandR = parseFloat(sandPrice) * 35.3147;
            khoaR = parseFloat(khoaPrice) * 35.3147;
            rd = x * (parseFloat(rod) / 100) * 7850;
        }

        setCementQt(cement.toFixed(2));
        setSandQt(sand.toFixed(2));
        setKhoaQt(khoa.toFixed(2));
        setRodQt(rd.toFixed(2));
        setSandRate(sandR.toFixed(2));
        setKhoaRate(khoaR.toFixed(2));

        const total = (parseFloat(cement) * parseFloat(cementPrice)) + (parseFloat(sand) * parseFloat(sandR)) + (parseFloat(khoa) * parseFloat(khoaR)) + (parseFloat(rd) * parseFloat(rodPrice));
        setTotalTaka(total);
    }



    return (
        <div className="w-full md:w-9/12 mx-auto my-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
            <div className="py-2 border-b border-gray-300">
                <h1 className="text-center text-xl font-bold text-blue-600">RCC Works</h1>
                <p className="text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
            </div> 
            <div className="w-full p-4 flex flex-col">
                <form onSubmit={resultHandler}>
                    <div className="w-full grid grid-cols-1 gap-y-2">

                        <div className="w-full grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <TextEn Title="Total Works" Id="w" Change={e => setW(e.target.value) } Value={w} Chr="150" />
                            </div>
                            <DropdownEn Title="Option" Id="cft" Change={e => setCft(e.target.value) } Value={cft}>
                                <option value="0">M3</option>
                                <option value="1">CFT</option>
                            </DropdownEn>
                        </div>

                        <div className="w-full grid grid-cols-4 gap-4 pb-4">
                            <TextNum Title="Ratio-1" Id="r1" Change={e =>  setR1(e.target.value) } Value={r1} />
                            <TextNum Title="Ratio-2" Id="r2" Change={e => setR2(e.target.value) } Value={r2}  />
                            <TextNum Title="Ratio-3" Id="r3" Change={e =>  setR3(e.target.value) } Value={r3} />
                            <TextNum Title="Rod %" Id="rod" Change={e =>  setRod(e.target.value)} Value={rod} />
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
                                <td>Cement</td>
                                <td className="text-end">{cementQt}</td>
                                <td className="text-end">bgs</td>
                                <td className="text-end">{parseFloat(cementPrice).toFixed(2)}</td>
                                <td className="text-end">{numberWithComma(parseFloat(cementQt) * parseFloat(cementPrice))}</td>
                            </tr>

                            <tr>
                                <td className="text-center">2</td>
                                <td>Sand</td>
                                <td className="text-end">{sandQt}</td>
                                <td className="text-end">{cft === '1' ? 'cft' : 'm3'}</td>
                                <td className="text-end">{parseFloat(sandRate).toFixed(2)}</td>
                                <td className="text-end">{numberWithComma(parseFloat(sandQt) * parseFloat(sandRate))}</td>
                            </tr>

                            <tr>
                                <td className="text-center">3</td>
                                <td>Khoa</td>
                                <td className="text-end">{khoaQt}</td>
                                <td className="text-end">{cft === '1' ? 'cft' : 'm3'}</td>
                                <td className="text-end">{parseFloat(khoaRate).toFixed(2)}</td>
                                <td className="text-end">{numberWithComma(parseFloat(khoaQt) * parseFloat(khoaRate))}</td>
                            </tr>

                            <tr>
                                <td className="text-center">4</td>
                                <td>Rod</td>
                                <td className="text-end">{rodQt}</td>
                                <td className="text-end">kgs</td>
                                <td className="text-end">{parseFloat(rodPrice).toFixed(2)}</td>
                                <td className="text-end">{numberWithComma(parseFloat(rodQt) * parseFloat(rodPrice))}</td>
                            </tr>

                            <tr className="font-bold border-t-2">
                                <td></td>
                                <td>Total</td>
                                <td className="text-end"></td>
                                <td className="text-end"></td>
                                <td className="text-end"></td>
                                <td className="text-end">{numberWithComma(totalTaka)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Rccwork;

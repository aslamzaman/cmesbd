"use client";
import React, { useState, useEffect } from "react";
import { BtnEn, TextEn, DropdownEn } from "@/components/Form";
import { landAreaConverter } from "@/lib/LandAreaConverter";

const ConverterPage = () => {

    const [opt, setOpt] = useState("sf");
    const [area, setArea] = useState(100);
    const [sft, setSft] = useState(0);

    const [newsft, setNewsft] = useState(0);
    const [newsm, setNewsm] = useState(0);
    const [newsc, setNewsc] = useState(0);
    const [newojutangsho, setNewojutangsho] = useState(0);
    const [newshotok, setNewshotok] = useState(0);
    const [newkatha, setNewkatha] = useState(0);
    const [newbigha, setNewbigha] = useState(0);
    const [newkani, setNewkani] = useState(0);
    const [newacre, setNewacre] = useState(0);
    const [newhectare, setNewhectare] = useState(0);
    const [newgonda, setNewgonda] = useState(0);
    const [newkora, setNewkora] = useState(0);
    const [newkranti, setNewkranti] = useState(0);
    const [newtil, setNewtil] = useState(0);
    const [newlink, setNewslink] = useState(0);



    useEffect(() => {
        let expr = opt;
        switch (expr) {
            case "sf":
                setSft(parseFloat(area) * 1);
                break;
            case "sm":
                setSft(parseFloat(area) * 10.7639);
                break;
            case "sc":
                setSft(parseFloat(area) * 4356);
                break;
            case "ojutangsho":
                setSft(parseFloat(area) * 4.356);
                break;
            case "shotok":
                setSft(parseFloat(area) * 435.6);
                break;
            case "katha":
                setSft(parseFloat(area) * 720);
                break;
            case "bigha":
                setSft(parseFloat(area) * 14400);
                break;
            case "kani":
                setSft(parseFloat(area) * 17280);
                break;
            case "acre":
                setSft(parseFloat(area) * 43560);
                break;
            case "hectare":
                setSft(parseFloat(area) * 107639);
                break;
            case "gonda":
                setSft(parseFloat(area) * 864);
                break;
            case "kora":
                setSft(parseFloat(area) * 653.4);
                break;
            case "kranti":
                setSft(parseFloat(area) * 72);
                break;
            case "til":
                setSft(parseFloat(area) * 3.6);
                break;
            case "slink":
                setSft(parseFloat(area) * 0.4356);
                break;
            default:
                console.log(`Sorry, we are out of ${expr}.`);
        }

    }, [opt, area]);


    const calculateLandAreaHandler = () => {
        let result = landAreaConverter.result(area, opt);
        console.log(result.shotok);

        let x = sft;
        setNewsft(x);
        setNewsm(x / 10.7639);
        setNewsc(x / 4356);
        setNewojutangsho(x / 4.356);
        setNewshotok(x / 435.6);
        setNewkatha(x / 720);
        setNewbigha(x / 14400);
        setNewkani(x / 17280);
        setNewacre(x / 43560);
        setNewhectare(x / 107639);
        setNewgonda(x / 864);
        setNewkora(x / 653.4);
        setNewkranti(x / 72);
        setNewtil(x / 3.6);
        setNewslink(x / 0.4356);
    }


    return (
        <>
            <h1 className="w-full text-center text-gray-400 text-2xl font-bold py-10">Land Area Converter</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4">
                <div className="w-full bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Calculator</h1>
                    </div>

                    <div className="px-6 pb-6 text-black">
                        <div className="grid grid-cols-1 gap-4 my-4">
                            <TextEn Title="Land Area" Id="area" Change={e => setArea(e.target.value)} Value={area} Chr="50" />
                            <DropdownEn Title="Option" Id="opt" Change={e => setOpt(e.target.value)} Value={opt}>
                                <option value="sf">Square Feet</option>
                                <option value="sm">Square Meter</option>
                                <option value="sc">Square Chain</option>
                                <option value="ojutangsho">Ojutangsho</option>
                                <option value="shotok">Decimal (Shotok)</option>
                                <option value="katha">Katha</option>
                                <option value="bigha">Bigha (Paki)</option>
                                <option value="kani">Kani(Aana)</option>
                                <option value="acre">Acre</option>
                                <option value="hectare">Hectare</option>
                                <option value="gonda">Gonda</option>
                                <option value="kora">Kora</option>
                                <option value="kranti">Kranti</option>
                                <option value="til">Til</option>
                                <option value="slink">Square Links</option>
                            </DropdownEn>

                            <BtnEn Title="Calculate" Click={calculateLandAreaHandler} Class="w-36 bg-blue-600 hover:bg-blue-800 text-white" />

                        </div>
                    </div>
                </div>

                <div className="w-full col-span-1 md:col-span-2 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                    <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                        <h1 className="text-xl font-bold text-blue-600">Result</h1>
                    </div>

                    <div className="px-6 pb-6 text-black">
                        <div className="grid grid-cols-1 gap-4 my-4">
                            <table className="w-full border border-gray-200">
                                <thead>
                                    <tr className="w-full bg-gray-200">
                                        <th className="text-center border-b border-gray-200 px-4 py-2">#</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Description</th>
                                        <th className="text-center border-b border-gray-200 px-4 py-2">Result</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">01</td>
                                        <td className="text-left py-2 px-4">Square Feet</td>
                                        <td className="text-end py-2 px-4">{newsft.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">02</td>
                                        <td className="text-left py-2 px-4">Square Meter</td>
                                        <td className="text-end py-2 px-4">{newsm.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">03</td>
                                        <td className="text-left py-2 px-4">Square Chain</td>
                                        <td className="text-end py-2 px-4">{newsc.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">04</td>
                                        <td className="text-left py-2 px-4">Ojutangsho</td>
                                        <td className="text-end py-2 px-4">{newojutangsho.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">05</td>
                                        <td className="text-left py-2 px-4">Shotok</td>
                                        <td className="text-end py-2 px-4">{newshotok.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">06</td>
                                        <td className="text-left py-2 px-4">Katha</td>
                                        <td className="text-end py-2 px-4">{newkatha.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">07</td>
                                        <td className="text-left py-2 px-4">Bigha (Paki)</td>
                                        <td className="text-end py-2 px-4">{newbigha.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">08</td>
                                        <td className="text-left py-2 px-4">Kani (Aana)</td>
                                        <td className="text-end py-2 px-4">{newkani.toFixed(3)}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">09</td>
                                        <td className="text-left py-2 px-4">Acre</td>
                                        <td className="text-end py-2 px-4">{newacre.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">10</td>
                                        <td className="text-left py-2 px-4">Hectare</td>
                                        <td className="text-end py-2 px-4">{newhectare.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">11</td>
                                        <td className="text-left py-2 px-4">Gonda</td>
                                        <td className="text-end py-2 px-4">{newgonda.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">12</td>
                                        <td className="text-left py-2 px-4">Kora</td>
                                        <td className="text-end py-2 px-4">{newkora.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">13</td>
                                        <td className="text-left py-2 px-4">Kranti</td>
                                        <td className="text-end py-2 px-4">{newkranti.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">14</td>
                                        <td className="text-left py-2 px-4">Til</td>
                                        <td className="text-end py-2 px-4">{newtil.toFixed(3)}</td>
                                    </tr>

                                    <tr className="border-b border-gray-200">
                                        <td className="text-center py-2 px-4">15</td>
                                        <td className="text-left py-2 px-4">Square Links</td>
                                        <td className="text-end py-2 px-4">{newlink.toFixed(3)}</td>
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
export default ConverterPage;

"use client";
import React, { useState } from "react";
import { BtnEn, TextNum, DropdownEn } from "@/components/Form";
import { conv_sft, get_mgc, sharing } from "@/lib/RajukRules";


const Property = () => {
    const [s1, setS1] = useState("4.72");
    const [s2, setS2] = useState("5.28");
    const [d, setD] = useState("50");
    const [opt, setOpt] = useState("0");

    const [share1, setShare1] = useState("0");
    const [share2, setShare2] = useState("0");
    const [developer, setDeveloper] = useState("0");
    const [total, setTotal] = useState("0");

    // ---------------------------------------------------------
    const [result1, setResult1] = useState("");
    const [result2, setResult2] = useState("");
    const [result3, setResult3] = useState("");
    const [result4, setResult4] = useState("");
    const [result5, setResult5] = useState("");
    const [result6, setResult6] = useState("");

    const calculateHandler = () => {
        let land = conv_sft(s1, s2, d, opt);
        let mgc = get_mgc(s1, s2, d, opt);
        let share = sharing(s1, s2, d, opt);


        console.log(share);
        setResult1(`FAR = ${mgc.result_far.toFixed(2)}; MGC (Maximum Ground Coverage) = ${mgc.result_mgc_ratio.toFixed(2)}%; Land area = ${land.toFixed(2)}sft.`);
        setResult2(`MBA (Maximum Building Area) = (FAR x Land area) = ${mgc.result_mgc.toFixed(2)}sft.;`)

        setResult3(`Allowable ground coverage (Land area x MGC) = ${(land * (mgc.result_mgc_ratio / 100)).toFixed(2)}sft.`)

        setResult4(`Maximum floor (without ground floor):`);

        setResult5(` = (MBA ÷ Allowable ground coverage)`);
        setResult6(`= ${(mgc.result_mgc / (land * (mgc.result_mgc_ratio / 100))).toFixed(2)}nos.`);


        setShare1(share.share1_sft.toFixed(2));
        setShare2(share.share2_sft.toFixed(2));
        setDeveloper(share.developer_sft.toFixed(2));
        setTotal((share.share1_sft + share.share2_sft + share.developer_sft).toFixed(2));

    }



    return (
        <div className="w-11/12 md:w-9/12 mx-auto my-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
            <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                <h1 className="text-xl font-bold text-blue-600">Rajuk Calulator</h1>
            </div>

            <div className="px-4 lg:px-6 my-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <TextNum Title="Share1" Id="share1" Change={e => setS1(e.target.value)} Value={s1} />
                    <TextNum Title="Share2" Id="share1" Change={e => setS2(e.target.value)} Value={s2} />
                    <TextNum Title="Developer (%)" Id="d" Change={e => setD(e.target.value)} Value={d} />
                    <DropdownEn Title="Developer (%)" Id="opt" Change={e => setOpt(e.target.value)} Value={opt}>
                        <option value="0">Decimal</option>
                        <option value="1">Katha</option>
                        <option value="2">Sft</option>
                    </DropdownEn>
                </div>
                <BtnEn Title="Calculate" Click={calculateHandler} Class="bg-gray-700 hover:bg-gray-900 text-white" />
            </div>

            <div className="w-full p-4 my-4">
                <p className="text-lg font-bold mb-3">Result as per Rajuk&#39;s building code</p>
                {result1}<hr />
                {result2}<hr />
                {result3}<hr />
                <strong>{result4}</strong><br />
                {result5}<br />
                <strong>{result6}</strong><hr />
            </div>

            <div className="w-full p-4 my-4 overflow-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-center">#</th>
                            <th className="text-left">Description</th>
                            <th className="text-end">MBA(SFT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="text-center">1</td>
                            <td className="text-left">Share - 1</td>
                            <td className="text-end">{share1}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="text-center">2</td>
                            <td className="text-left">Share - 2</td>
                            <td className="text-end">{share2}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="text-center">3</td>
                            <td className="text-left">Developer</td>
                            <td className="text-end">{developer}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="text-center"></td>
                            <td className="text-left"><strong>Total</strong></td>
                            <td className="text-end"><strong>{total}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

};
export default Property;

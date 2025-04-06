"use client";
import React, { useState } from "react";
import { TextEn, TextBn, TextNum, BtnEn } from "@/components/Form";
import { inwordBangla, inwordEnglish, inwordUnicode, titleCamelCase } from "@/lib/utils";



const Inwordconverter = ({ Msg }) => {
    const [tk, setTk] = useState("12345");
    const [inword_en, setInword_en] = useState("");
    const [inword_bn, setInword_bn] = useState("");
    const [inword_un, setInword_un] = useState("");


    const resultHandler = () => {
        setInword_bn(inwordBangla(tk));
        setInword_en(inwordEnglish(tk));
        setInword_un(inwordUnicode(tk));
    }


    return (
        <>
            <div className="w-full lg:w-1/2 mx-auto mt-10 border-2 border-gray-300 rounded-md shadow-md">
                <div className="w-full border-b-2 border-gray-300">
                    <h1 className="w-full text-xl lg:text-3xl py-4 font-bold text-center text-gray-500">Inword</h1>
                </div>

                <div className="w-full p-4 overflow-auto">
                    <div className="grid grid-col-1 gap-y-4 mt-6">
                        <TextNum Title="Number" Id="tk" Change={e => setTk(e.target.value)} Value={tk} />
                        <TextBn Title="Inword Bangla (Bijoy)" Id="inword_bn" Change={e => setInword_bn(e.target.value)} Value={inword_bn} Chr="100" />
                        <TextBn Title="Inword Unicode" Id="inword_un" Change={e => setInword_un(e.target.value)} Value={inword_un} Chr="100" />
                        <TextEn Title="Inword English" Id="inword_en" Change={e => setInword_en(e.target.value)} Value={titleCamelCase(inword_en)} Chr="200" />
                        <BtnEn Title="Result" Click={resultHandler} Class="w-36 bg-gray-600 hover:bg-gray-800 text-white" />
                    </div>
                </div>
            </div>
        </>
    );

};
export default Inwordconverter;

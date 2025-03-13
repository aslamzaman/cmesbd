"use client";
import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextNum } from "@/components/Form";

const Vattax = () => {
    const [taka, setTaka] = useState("10000");
    const [vat, setVat] = useState("20");
    const [tax, setTax] = useState("10");
    const [calculationType, setCalculationType] = useState("Overall Calculation");


    const [result, setResult] = useState({});




    const Calculate = (e) => {
        e.preventDefault();
        const v = parseFloat(vat);
        const t = parseFloat(tax);
        const tk = parseFloat(taka);
  
        if (calculationType === "overall") {
            // overall 
            const vatTaka = (tk * (v / 100)).toFixed(2);
            const taxTaka = (tk * (t / 100)).toFixed(2);
            const vatTaxTaka = vatTaka + taxTaka;
            const billTaka = tk.toFixed(2);
            const allTaka = (parseFloat(tk) + parseFloat(vatTaxTaka)).toFixed(2);
            setResult({ vatTaka, taxTaka, billTaka, allTaka })
        } else {
            // gov
            const vatTaka = (tk * (v / 100)).toFixed(2);
            const taxTaka = (tk * (t / 100)).toFixed(2);
            const billTaka = (tk - (tk * (t / 100))).toFixed(2);
            const vatTaxTaka = vatTaka + taxTaka;
            const allTaka = (parseFloat(billTaka) + parseFloat(vatTaxTaka)).toFixed(2);
            setResult({ vatTaka, taxTaka, billTaka, allTaka })
        }

    }



    return (
        <>
            <div className="w-full lg:w-3/4 mx-auto p-4 mt-10 border-2 border-gray-300 rounded-md shadow-md">
                <div className="w-full mt-4">
                    <h1 className="w-full text-xl md:text-2xl font-bold text-center text-gray-500">VAT and TAX Calculation</h1>
                    <h1 className="w-full text-md font-bold text-center text-blue-500">VAT = {result.vatTaka}, TAX = {result.taxTaka}, Bill = {result.billTaka}, Total = {result.allTaka}</h1>
                </div>

                <div className="w-full px-4 overflow-auto">
                    <form onSubmit={Calculate} className="grid grid-cols-1 gap-4">


                        <div className="flex space-x-4 ">

                            <DropdownEn Title="Calculation Type" Id="calculationType" Change={e => setCalculationType(e.target.value)} Value={calculationType}>
                                <option value="overall">Overall Calculation</option>
                                <option value="gov">Calculation as per government rules</option>
                            </DropdownEn>
                        </div>



                        <div className="w-full flex space-x-4">
                            <TextNum Title="Vat(%)" Id="vat" Change={e => setVat(e.target.value)} Value={vat} />
                            <TextNum Title="Tax(%)" Id="tax" Change={e => setTax(e.target.value)} Value={tax} />
                        </div>



                        <div className="w-full pb-6 flex space-x-4">
                            <TextNum Title="Total Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                            <BtnSubmit Title="Calculate" Class="w-36 bg-gray-600 hover:bg-gray-800 text-white" />
                        </div>



                    </form>
                </div>
            </div >
        </>
    );

};
export default Vattax;

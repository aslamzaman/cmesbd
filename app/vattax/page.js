"use client";
import React, { useState } from "react";
import { BtnSubmit, TextNum } from "@/components/Form";

const Vattax = () => {
    const [taka, setTaka] = useState("10400");
    const [vat, setVat] = useState("20");
    const [tax, setTax] = useState("10");


    const [bill, setBill] = useState("");
    const [vat1, setVat1] = useState("");
    const [tax1, setTax1] = useState("");



    const Calculate = (e) => {
        e.preventDefault();
        const v = parseFloat(vat) / 100;
        const t = parseFloat(tax) / 100;
        const tk = parseFloat(taka);
        /*
        10400= 8000 + 1600 + 800
        tk = s + (s*v) + (s*t)
        s(1+v+t) = tk
        s= tk/(1+v+t)
        
        */
        const b = tk / (1 + v + t);
        setBill(b.toFixed(2));
        setVat1((b * v).toFixed(2));
        setTax1((b * t).toFixed(2));

        // setMsg(`Calculated Bill=${bill.toFixed(2)}, Vat=${v.toFixed(2)}, Tax=${t.toFixed(2)}`);

    }


    return (
        <>
            <div className="w-full lg:w-1/2 mx-auto p-4 mt-10 border-2 border-gray-300 rounded-md shadow-md">
                <div className="w-full mt-4">
                    <h1 className="w-full text-xl md:text-2xl font-bold text-center text-gray-500">VAT and TAX</h1>
                </div>

                <div className="w-full overflow-auto">
                    <div className="mt-6 px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full">
                                <form onSubmit={Calculate}>
                                    <div className="grid grid-cols-1 gap-2">
                                        <TextNum Title="Payable Bill" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                        <TextNum Title="Vat" Id="vat" Change={e => setVat(e.target.value)} Value={vat} />
                                        <TextNum Title="Tax" Id="tax" Change={e => setTax(e.target.value)} Value={tax} />
                                    </div>
                                    <BtnSubmit Title="Calculate" Class="w-36 bg-gray-600 hover:bg-gray-800 text-white" />
                                </form>
                            </div>
                            <div className="w-full py-3">
                                <div className="w-full p-5 bg-white border border-2 border-gray-200 drop-shadow-lg rounded-md">
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td colSpan="3" className="text-center font-bold underline pb-3">Bill</td>
                                            </tr>
                                            <tr>
                                                <td>Bill</td>
                                                <td className="text-end">=</td>
                                                <td className="text-end">{bill}</td>
                                            </tr>
                                            <tr>
                                                <td>Vat <span className="text-xs">({vat}%)</span></td>
                                                <td className="text-end">=</td>
                                                <td className="text-end">{vat1}</td>
                                            </tr>
                                            <tr>
                                                <td>Tax <span className="text-xs"> ({tax}%)</span></td>
                                                <td className="text-end">=</td>
                                                <td className="text-end">{tax1}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="w-full text-center"><hr className="w-full border border-1 border-gray-80" /></td>
                                            </tr>
                                            <tr className="font-bold">
                                                <td>Total</td>
                                                <td className="text-end">=</td>
                                                <td className="text-end">{parseFloat(taka).toFixed(2)}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

};
export default Vattax;

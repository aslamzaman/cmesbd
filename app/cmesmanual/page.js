"use client";
import React from "react";


const Cmesmanual = () => {


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">CMES Manual</h1>
            </div>

            <div className="w-full border-2 border-gray-200 p-4 shadow-md rounded-md">
                <div className="w-full overflow-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <iframe src="/cmesmanual/HRPolicyEnglish.pdf?#zoom=70" title="AccountingManualEnglish-06.03.14" className="w-full h-[850px] border-2 border-gray-400">noframes</iframe>
                    <iframe src="/cmesmanual/HRPolicyBangla.pdf?#zoom=70" title="AccountingManualBangla-17.07.14" className="w-full h-[850px] border-2 border-gray-400"></iframe>
                    <iframe src="/cmesmanual/FinancialManuaEnglish-06.03.14.pdf?#zoom=70" title="FinancialManuaEnglish-06.03.14" className="w-full h-[850px] border-2 border-gray-400"></iframe>
                    <iframe src="/cmesmanual/FinancialManualBangla-17.07.14.pdf?#zoom=70" title="FinancialManualBangla-17.07.14.14" className="w-full h-[850px] border-2 border-gray-400"></iframe>
                </div>
            </div>
        </>
    );
};

export default Cmesmanual;


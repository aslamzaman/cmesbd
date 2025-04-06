"use client";
import React, { useState } from "react";
import { BtnSubmit, TextDt, TextEn, TextNum, TextareaEn } from "@/components/Form";

import { leaveJoin, leaveLeave, elTaka } from "./_lib/Calculation";
import { dateDifferenceLocal, formatedDate } from "@/lib/utils";


const Benefit = () => {
    const [join, setJoin] = useState(formatedDate("2014-05-05"));
    const [leave, setLeave] = useState(formatedDate("2017-10-01"));
    const [last_salary, setLast_salary] = useState("6300");
    const [salary15, setSalary15] = useState("6000");
    const [el_days, setEl_days] = useState("14.9");
    const [add_deduct, setAdd_deduct] = useState("7112.90");

    const [result, setResult] = useState("");


    const cmdCalculate = (e) => {
        e.preventDefault();
        const dateDiff = dateDifferenceLocal(join, leave);

        const lastHalfSalary = (parseInt(last_salary) / 2).toFixed(2);

        const taka1 = parseFloat(dateDiff.years * lastHalfSalary).toFixed(2);
        const taka2 = parseFloat((dateDiff.months / 12) * lastHalfSalary).toFixed(2);
        const taka3 = parseFloat((dateDiff.days / 365) * lastHalfSalary).toFixed(2);

        let gratuity = 0;
        if (dateDiff.years < 3) {
            gratuity = 0;
        } else {
            gratuity = (parseFloat(taka1) + parseFloat(taka2) + parseFloat(taka3)).toFixed(2);
        }

        const el_taka = elTaka(salary15, el_days);


        const str = `Working Days:            ${dateDiff.years}-${dateDiff.months}-${dateDiff.days} (Manually)

Years Taka:                  ${taka1}
Months Taka:               ${taka2}
Days Taka:                   ${taka3}
--------------------------------------------------
Total Taka (Gratuity):   ${gratuity}

${leaveJoin(join)}
---------------------------------------------------------
${leaveLeave(leave)}

Final payment:
${el_taka[0]}
Gratuity                                    = ${parseFloat(gratuity).toFixed(2)}
Add & Deduct                          = ${parseFloat(eval(add_deduct)).toFixed(2)}
--------------------------------------------------
Total Taka                                 = ${(parseFloat(el_taka[1]) + parseFloat(gratuity) + parseFloat(eval(add_deduct))).toFixed(2)}

`
        setResult(str);

    }



    return (
        <>
            <div className="bg-gray-100 py-4 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-500">Staff Benefit Calculation</h1>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <form onSubmit={cmdCalculate}>
                    <div className="w-full grid grid-cols-1 gap-3 border p-4">
                        <TextDt Title="Joininig Date" Change={e => setJoin(e.target.value)} Value={join} />
                        <TextDt Title="Leave Effective Date" Change={e => setLeave(e.target.value)} Value={leave} />
                        <TextNum Title="Last Salary" Change={e => setLast_salary(e.target.value)} Value={last_salary} />
                        <TextNum Title="Salary on 2015" Change={e => setSalary15(e.target.value)} Value={salary15} />
                        <TextNum Title="EL Days" Change={e => setEl_days(e.target.value)} Value={el_days} />
                        <TextEn Title="Add Deduct" Change={e => setAdd_deduct(e.target.value)} Value={add_deduct} Chr="100" />
                    </div>
                    <BtnSubmit Title="Calculate" Class="text-white bg-blue-600 hover:bg-blue-900" />
                </form>

                <div className="w-full grid grid-cols-1 gap-4 border p-4">
                    <TextareaEn Title="Result" Id="result" Rows="22" Change={e => setResult(e.target.value)} Value={result} />
                </div>
            </div>


        </>
    )

}

export default Benefit;


































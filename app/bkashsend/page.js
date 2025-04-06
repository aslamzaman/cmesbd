"use client";
import React, { useState } from "react";
import { BtnSubmit, TextEn, TextNum } from "@/components/Form";
import { evaluate } from "mathjs";


const Bkash = () => {
    const [tk, setTk] = useState("1000");
    const [charge, setCharge] = useState("18.5");
    const [sendCharge, setSendCharge] = useState("5");
    const [msg, setMsg] = useState("");
    const [msg1, setMsg1] = useState("");






    const handleCreate = async (e) => {
        e.preventDefault();
        const bill = evaluate(tk);
        const bCharge = bill * (parseFloat(charge) / 1000);

        const total = bill + bCharge + parseFloat(sendCharge); // 1023.5
        const restTaka = total % 5;
  
        let x = 0;
        if (restTaka > 0) {
            x = 5;
        } else {
            x = 0;
        }

        const totalTaka = total - restTaka + x;
        const withOutSendMoney = totalTaka - sendCharge;

        const st = `Bill= ${bill}, Bkash Charge= ${bCharge.toFixed(2)}, Sending charge =${sendCharge}; Total = ${total.toFixed(2)} -> ${totalTaka}`;
        setMsg(st);
        console.log(totalTaka)
        setMsg1(`Bkash Bill= ${parseInt(totalTaka) - parseInt(bill)}; Send Taka = ${withOutSendMoney}`)
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-gray-400">Send Money Bkash Charge</h1>
                <p className="text-center text-md text-gray-600 mt-4">{msg}<br /><span className="text-lg font-bold text-blue-700">{msg1}</span></p>

            </div>

            <div className="px-4 lg:px-6">
                <div className="w-full md:w-8/12 mx-auto border-2 p-4 shadow-md rounded-md">
                    <form onSubmit={handleCreate}>
                        <div className="grid grid-cols-3 gap-2 my-2 gap-4">
                            <TextEn Title="Taka" Id="tk" Change={e => setTk(e.target.value)} Value={tk} />
                            <TextNum Title="Charge (per thousand)" Id="charge" Change={e => setCharge(e.target.value)} Value={charge} />
                            <TextNum Title="Send Charge" Id="sendCharge" Change={e => setSendCharge(e.target.value)} Value={sendCharge} />
                        </div>
                        <div className="w-full flex justify-start">
                            <BtnSubmit Title="Calculate" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
};

export default Bkash;




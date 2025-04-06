"use client";
import { BtnSubmit, DropdownEn, TextEn } from "@/components/Form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const Imagestopdf = () => {
    const [qt, setQt] = useState("Q1");
    const [activity, setActivity] = useState("1322.1");

    const router = useRouter();

    const createPdfHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('imagesprintpdf', JSON.stringify({ qt, activity }));
        router.push("/imagesprintpdf/createpdf");
    }


    return (
        <>
            <div className="bg-gray-100 py-4 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-500">Images to PDF</h1>
            </div>

            <div className="w-full lg:w-1/2 p-4 mx-auto mt-20 border-2 border-gray-400 shadow-lg rounded-lg">
                <form onSubmit={createPdfHandler}>
                    <div className="w-full grid grid-cols-2 gap-3 border p-4">
                        <DropdownEn Title="Quarter" Id="qt" Change={e => setQt(e.target.value)} Value={qt}>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </DropdownEn>
                        <TextEn Title="Activity Number" Id="activity" Change={e => setActivity(e.target.value)} Value={activity} Chr={150} />
                    </div>
                    <BtnSubmit Title="Process PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />
                </form>
            </div>
        </>
    )
}

export default Imagestopdf;

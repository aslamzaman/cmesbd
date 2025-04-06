import React, { useState } from "react";
import { BtnSubmit, DropdownBn, TextBn, TextDt, TextNum } from "@/components/Form";
import { addDataToIndexedDB } from "@/lib/DatabaseIndexedDB";
import { formatedDate } from "@/lib/utils";

const Add = ({ message }) => {
    const [dt, setDt] = useState('');
    const [place1, setPlace1] = useState('');
    const [tm1, setTm1] = useState('');
    const [place2, setPlace2] = useState('');
    const [tm2, setTm2] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [taka, setTaka] = useState('');
    const [cause, setCause] = useState('');
    const [show, setShow] = useState(false);


    const resetVariables = () => {
        setDt(formatedDate(new Date()));
        setPlace1('');
        setTm1('');
        setPlace2('');
        setTm2('');
        setVehicle('');
        setTaka('');
        setCause('');
    }


    const showAddForm = () => {
        setShow(true);
        resetVariables();
    }


    const closeAddForm = () => {
        setShow(false);
    }


    const createObject = () => {
        return {
            id: Date.now(),
            dt: dt,
            place1: place1,
            tm1: tm1,
            place2: place2,
            tm2: tm2,
            vehicle: vehicle,
            taka: taka,
            cause: cause
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = await addDataToIndexedDB('tabill', newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving tabill data:", error);
            message("Error saving tabill data.");
        } finally {
            setShow(false);
        }
    }


    return (
        <>
            {show && (
                <div className="fixed inset-0 px-2 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-full md:w-[500px] lg:w-[800px] mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Add New Data</h1>
                            <button onClick={closeAddForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4 pb-6 text-black">
                            <form onSubmit={saveHandler}>
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
                                    <TextBn Title="Start Place  (SutonnyMJ)" Id="place1" Change={e => setPlace1(e.target.value)} Value={place1} Chr={150} />
                                    <TextNum Title="Start Time" Id="tm1" Change={e => setTm1(e.target.value)} Value={tm1} />
                                    <TextBn Title="End Place (SutonnyMJ)" Id="place2" Change={e => setPlace2(e.target.value)} Value={place2} Chr={150} />
                                    <TextNum Title="End Time" Id="tm2" Change={e => setTm2(e.target.value)} Value={tm2} />
                                    <DropdownBn Title="Vehicle" Id="vehicle" Change={e => setVehicle(e.target.value)} Value={vehicle}>
                                        <option value="evm">evm</option>
                                        <option value="wmGbwR">wmGbwR</option>
                                        <option value="wi·v">wi·v</option>
                                        <option value="ûÛv">ûÛv</option>
                                        <option value="f¨vb">f¨vb</option>
                                        <option value="†bŠKv">†bŠKv</option>
                                        <option value="UÖvK">UÖvK</option>
                                        <option value="†ijMvwo">†ijMvwo</option>
                                        <option value="evBmvB‡Kj">evBmvB‡Kj</option>
                                        <option value="A‡UvwiKkv">A‡UvwiKkv</option>
                                        <option value="wba©vwiZ">wba©vwiZ</option>
                                    </DropdownBn>
                                    <TextNum Title="Taka" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                    <TextBn Title="Cause (SutonnyMJ)" Id="cause" Change={e => setCause(e.target.value)} Value={cause} Chr={150} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeAddForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <button onClick={showAddForm} className="px-1 py-1 bg-blue-500 hover:bg-blue-700 rounded-md transition duration-500" title="Add New">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-7 h-7 stroke-white hover:stroke-gray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    )
}
export default Add;


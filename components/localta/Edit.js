import React, { useState } from "react";
import { BtnSubmit, DropdownBn, TextBn, TextNum } from "@/components/Form";
import { updateDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const Edit = ({ message, id, data }) => {
    const [place1, setPlace1] = useState('');
    const [t1, setT1] = useState('');
    const [place2, setPlace2] = useState('');
    const [t2, setT2] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [taka, setTaka] = useState('');
    const [show, setShow] = useState(false);


    const showEditForm = () => {
        message("Ready to edit");
        setShow(true);
        try {
            const { place1, t1, place2, t2, vehicle, taka } = data;
            setPlace1(place1);
            setT1(t1);
            setPlace2(place2);
            setT2(t2);
            setVehicle(vehicle);
            setTaka(taka);
        } catch (err) {
            console.log(err);
        }
    };


    const closeEditForm = () => {
        setShow(false);
    };


    const createObject = () => {
        return {
            id: id,
            place1: place1,
            t1: t1,
            place2: place2,
            t2: t2,
            vehicle: vehicle,
            taka: taka
        }
    }


    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = await updateDataToIndexedDB('localta', id, newObject);
            message(msg);
        } catch (error) {
            console.error("Error updating localta data:", error);
            message("Error updating localta data.");
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
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>

                        <div className="px-4 pb-6 text-black">
                            <form onSubmit={updateHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                <TextBn Title="Start Place (SutonnyMJ)" Id="place1" Change={e => setPlace1(e.target.value)} Value={place1} Chr={150} />
                                    <TextBn Title="Start Time (SutonnyMJ)" Id="t1" Change={e => setT1(e.target.value)} Value={t1} Chr={150} />
                                    <TextBn Title="End Place (SutonnyMJ)" Id="place2" Change={e => setPlace2(e.target.value)} Value={place2} Chr={150} />
                                    <TextBn Title="End Time (SutonnyMJ)" Id="t2" Change={e => setT2(e.target.value)} Value={t2} Chr={150} />
                                    <DropdownBn Title="Vehicle" Id="vehicle" Change={e => setVehicle(e.target.value)} Value={vehicle}>
                                        <option value="evm">evm</option>
                                        <option value="wmGbwR">wmGbwR</option>
                                        <option value="wi·v">wi·v</option>
                                    </DropdownBn>
                                    <TextNum Title="Taka (SutonnyMJ)" Id="taka" Change={e => setTaka(e.target.value)} Value={taka} />
                                </div>
                                <div className="w-full flex justify-start">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>


                    </div >
                </div >
            )}
            <button onClick={showEditForm} title="Edit" className="px-1 py-1 hover:bg-teal-300 rounded-md transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-black hover:stroke-blue-800 transition duration-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </button>
        </>
    )
}
export default Edit;


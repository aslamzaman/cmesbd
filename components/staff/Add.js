import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextBn, TextEn } from "@/components/Form";
import { addDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const Add = ({ message }) => {
    const [nameEn, setNameEn] = useState('');
    const [nameBn, setNameBn] = useState('');
    const [gender, setGender] = useState('');
    const [postEn, setPostEn] = useState('');
    const [postBn, setPostBn] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [show, setShow] = useState(false);


    const resetVariables = () => {
        setNameEn('');
        setNameBn('');
        setGender('');
        setPostEn('');
        setPostBn('');
        setAddress('');
        setMobile('');
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
            nameEn: nameEn,
            nameBn: nameBn,
            gender: gender,
            postEn: postEn,
            postBn: postBn,
            address: address,
            mobile: mobile
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = await addDataToIndexedDB('staff', newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving staff data:", error);
            message("Error saving staff data.");
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
                                    <TextEn Title="Name (English)" Id="nameEn" Change={e => setNameEn(e.target.value)} Value={nameEn} Chr={150} />
                                    <TextBn Title="Name (Bangla-SutonnyMj)" Id="nameBn" Change={e => setNameBn(e.target.value)} Value={nameBn} Chr={150} />
                                    <DropdownEn Title="Gender" Id="gender" Change={e => setGender(e.target.value)} Value={gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </DropdownEn>
                                    <TextEn Title="Post (English)" Id="postEn" Change={e => setPostEn(e.target.value)} Value={postEn} Chr={150} />
                                    <TextBn Title="Post (Bangla-SutonnyMj)" Id="postBn" Change={e => setPostBn(e.target.value)} Value={postBn} Chr={150} />
                                    <TextEn Title="Address (English)" Id="address" Change={e => setAddress(e.target.value)} Value={address} Chr={150} />
                                    <TextEn Title="Mobile (English)" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={150} />
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


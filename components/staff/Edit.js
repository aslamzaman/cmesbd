import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextBn, TextEn } from "@/components/Form";
import { updateDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const Edit = ({ message, id, data  }) => {
    const [nameEn, setNameEn] = useState('');
    const [nameBn, setNameBn] = useState('');
    const [gender, setGender] = useState('');
    const [postEn, setPostEn] = useState('');
    const [postBn, setPostBn] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');   
    const [show, setShow] = useState(false);


  const showEditForm = () => {
        message("Ready to edit");
        setShow(true);
        try {
            const { nameEn, nameBn, gender, postEn, postBn, address, mobile } = data;
            setNameEn(nameEn);
            setNameBn(nameBn);
            setGender(gender);
            setPostEn(postEn);
            setPostBn(postBn);
            setAddress(address);
            setMobile(mobile);
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
            nameEn: nameEn,
            nameBn: nameBn,
            gender: gender,
            postEn: postEn,
            postBn: postBn,
            address: address,
            mobile: mobile            
        }
    }


    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = await updateDataToIndexedDB('staff', id, newObject);
            message(msg);
        } catch (error) {
            console.error("Error updating staff data:", error);
            message("Error updating staff data.");
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
  

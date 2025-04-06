import React, { useState } from "react";
import { BtnSubmit, TextEn } from "@/components/Form";
import { updateDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const Edit = ({ message, id, data }) => {
    const [identify, setIdentify] = useState('');
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const [account, setAccount] = useState('');
    const [branch, setBranch] = useState('');
    const [routing, setRouting] = useState('');
    const [thana, setThana] = useState('');
    const [district, setDistrict] = useState('');
    const [mobile, setMobile] = useState('');
    const [show, setShow] = useState(false);


    const showEditForm = () => {
        message("Ready to edit");
        setShow(true);
        try {
            const { identify, name, bank, account, branch, routing, thana, district, mobile } = data;
            setIdentify(identify);
            setName(name);
            setBank(bank);
            setAccount(account);
            setBranch(branch);
            setRouting(routing);
            setThana(thana);
            setDistrict(district);
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
            identify: identify,
            name: name,
            bank: bank,
            account: account,
            branch: branch,
            routing: routing,
            thana: thana,
            district: district,
            mobile: mobile
        }
    }


    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const newObject = createObject();
            const msg = await updateDataToIndexedDB('receiver', id, newObject);
            message(msg);
        } catch (error) {
            console.error("Error updating receiver data:", error);
            message("Error updating receiver data.");
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
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                                    <TextEn Title="Identify" Id="identify" Change={e => setIdentify(e.target.value)} Value={identify} Chr={150} />
                                    <TextEn Title="Name (Bank Account Head)" Id="name" Change={e => setName(e.target.value)} Value={name} Chr={150} />
                                    <TextEn Title="Bank Name" Id="bank" Change={e => setBank(e.target.value)} Value={bank} Chr={150} />
                                    <TextEn Title="Account Number" Id="account" Change={e => setAccount(e.target.value)} Value={account} Chr={150} />
                                    <TextEn Title="Branch Name" Id="branch" Change={e => setBranch(e.target.value)} Value={branch} Chr={150} />
                                    <TextEn Title="Routing Number" Id="routing" Change={e => setRouting(e.target.value)} Value={routing} Chr={150} />
                                    <TextEn Title="Thana" Id="thana" Change={e => setThana(e.target.value)} Value={thana} Chr={150} />
                                    <TextEn Title="District" Id="district" Change={e => setDistrict(e.target.value)} Value={district} Chr={150} />
                                    <TextEn Title="Bank Mobile" Id="mobile" Change={e => setMobile(e.target.value)} Value={mobile} Chr={150} />
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


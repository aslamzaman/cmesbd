import React, { useState } from "react";
import { BtnSubmit, DropdownEn, TextDt, TextNum, TextEnDisabled } from "@/components/Form";
import { updateDataToFirebase, getDataFromFirebase } from "@/lib/firebaseFunction";
import LoadingDot from "../LoadingDot";
import { formatedDate } from "@/lib/utils";



const Edit = ({ message, id, data }) => {
    const [productId, setProductId] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [dt, setDt] = useState('');
    const [unit, setUnit] = useState('');
    const [cost, setCost] = useState('');
    const [userId, setUserId] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const [show, setShow] = useState(false);
    const [busy, setBusy] = useState(false);


    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);



    const showEditForm = async () => {
        setShow(true);
        try {
            const [responseProduct, responseVendor] = await Promise.all([
                getDataFromFirebase("product"),
                getDataFromFirebase("vendor")
            ]);
            // console.log(responseProduct, responseVendor)
            setVendors(responseVendor);
            setProducts(responseProduct);
            //-----------------------

            const { productId, vendorId, dt, unit, cost, userId, createdAt } = data;
            setProductId(productId);
            setVendorId(vendorId);
            setDt(formatedDate(dt));
            setUnit(unit);
            setCost(cost);
            setUserId(userId);
            setCreatedAt(createdAt);

        } catch (error) {
            console.error('Failed to fetch delivery data:', error);
        }

    };


    const closeEditForm = () => {
        setShow(false);
    };


    const createObject = () => {
        return {
            productId: productId,
            vendorId: vendorId,
            dt: dt,
            unit: unit,
            cost: cost,
            userId: userId,
            createdAt: createdAt
        }
    }


    const saveHandler = async (e) => {
        e.preventDefault();
        try {
            setBusy(true);
            const newObject = createObject();
            const msg = await updateDataToFirebase("purchase", id, newObject);
            message(msg);
        } catch (error) {
            console.error("Error saving purchase data:", error);
            message("Error saving purchase data.");
        } finally {
            setBusy(false);
            setShow(false);
        }
    }





    return (
        <>
            {busy ? <LoadingDot message="Please wait" /> : null}
            {show && (
                <div className="fixed left-0 top-[60px] right-0 bottom-0 p-4 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
                    <div className="w-full sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-1/2 mx-auto my-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-500">
                        <div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
                            <h1 className="text-xl font-bold text-blue-600">Edit Existing Data</h1>
                            <button onClick={closeEditForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md transition duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                        </div>
                        <div className="px-6 pb-6 text-black">
                            <form onSubmit={saveHandler} >
                                <div className="grid grid-cols-1 gap-4 my-4">
                                    <DropdownEn Title="Product" Id="productId" Change={e => setProductId(e.target.value)} Value={productId}>
                                        {products.length ? products.map(product => <option value={product.id} key={product.id}>{product.name} - {product.description}</option>) : null}
                                    </DropdownEn>

                                    <DropdownEn Title="Vendor" Id="vendorId" Change={e => setVendorId(e.target.value)} Value={vendorId}>
                                        {vendors.length ? vendors.map(vendor => <option value={vendor.id} key={vendor.id}>{vendor.name} - {vendor.address}</option>) : null}
                                    </DropdownEn>

                                    <TextDt Title="Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />

                                    <TextNum Title="Unit" Id="unit" Change={e => setUnit(e.target.value)} Value={unit} />
                                    <TextNum Title="Cost" Id="cost" Change={e => setCost(e.target.value)} Value={cost} />
                                </div>
                                <div className="w-full mt-4 flex justify-start pointer-events-auto">
                                    <input type="button" onClick={closeEditForm} value="Close" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-3 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                                    <BtnSubmit Title="Save" Class="bg-blue-600 hover:bg-blue-800 text-white" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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







import React, { useState } from "react";
import { BtnEn, TextEn, TextNum } from "../Form";
import { Close } from "../Icons";

import { addVatTax, addBkash } from "@/helpers/bayprostabexecutionHelpers";

const Plus = ({ message, data }) => {

	const [sl, setSl] = useState("");
	const [vatTax, setVatTax] = useState("10.5");
	const [bks, setBks] = useState("18.5");
	const [sendCharge, setSendCharge] = useState("5");


	const [show, setShow] = useState(false);


	const showModal = () => {
		setShow(true);
		const dataToSl = data.map((item, i) => (i + 1)).join(", ");
		setSl(dataToSl);
	}


	const addVatTaxHandler = () => {
		if (vatTax === "" || sl === "") return false;
		const sls = sl.split(",").map(item => parseInt(item.trim()) - 1);
		const msg = addVatTax(data, sls, parseFloat(vatTax));
		message(msg);
		setShow(false);
	}


	const addBkashCharge = () => {
		if (bks === "" || sl === "" || sendCharge === "") return false;
		const sls = sl.split(",").map(item => parseInt(item.trim()) - 1);
		const msg = addBkash(data, sls, parseFloat(bks), parseFloat(sendCharge));
		message(msg);
		setShow(false);
	}




	return (
		<>
			{show && (
				<div className="fixed inset-0 px-2 py-16 bg-black bg-opacity-30 backdrop-blur-sm z-10 overflow-auto">
					<div className="w-full md:w-3/4 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
						<div className="px-6 md:px-6 py-2 flex justify-between items-center border-b border-gray-300">
							<h1 className="text-xl font-bold text-blue-600">Add Items</h1>
							<Close Click={() => { setShow(false) }} Size="w-9 h-9" />
						</div>




						<div className="p-4 text-black grid grid-cols-1 gap-3 overflow-auto">
							<TextEn Title="Serial Numbers" Id="sl" Change={e => setSl(e.target.value)} Value={sl} Chr={150} />

							<div className='w-full flex items-center space-x-4'>
								<div className='w-[195px]'>
									<TextNum Title="VatTax(%)" Id="vatTax" Change={e => setVatTax(e.target.value)} Value={vatTax} />
								</div>

								<button onClick={addVatTaxHandler} className="w-[100px] text-center px-2 py-1.5 mt-5 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 ${Class} cursor-pointer">Vat&Tax</button>
							</div>

							<div className='w-full flex items-center space-x-4'>
								<div className='w-[195px]'>
									<TextNum Title="Charge (per 1000)" Id="bks" Change={e => setBks(e.target.value)} Value={bks} />
								</div>
								<div className='w-[195px]'>
									<TextNum Title="Send Charge" Id="sendCharge" Change={e => setSendCharge(e.target.value)} Value={sendCharge} />
								</div>
								<button onClick={addBkashCharge} className="w-[100px] text-center px-2 py-1.5 mt-5 bg-green-700 hover:bg-green-900 text-white font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 ${Class} cursor-pointer">Bkash</button>
							</div>

						</div>






						<div className="px-6 py-6 flex justify-end items-center border-t border-gray-300">
							<BtnEn Title="Close" Click={() => { setShow(false); message("Data ready") }} Class="bg-red-600 hover:bg-red-800 text-white mr-1" />
						</div>
					</div>
				</div>
			)}
			<button title="Add Others" onClick={showModal} className="w-7 h-7 rounded-full hover:bg-gray-200 mr-0.5 flex justify-center items-center">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M1 11 L9 11 M5 7 L5 15     M7 5 L15 5  M11 1 L11 9" />
				</svg>
			</button>
		</>
	)
}
export default Plus;


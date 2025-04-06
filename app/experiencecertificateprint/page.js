"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { formatedDateEnglish } from "@/lib/utils";
import { useRouter } from "next/navigation";


const ExpPrint = () => {
  const [data, setData] = useState({});

  const componentRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    const localData = localStorage.getItem('exp');
    if (localData) {
      const jsonData = JSON.parse(localData);
      setData(jsonData);
      console.log(jsonData);
    }
  }, []);



  const pageStyle = `@media print {
        @page {
            size: A4 portrait;
            margin: 1in;
            @bottom-right {
                content: counter(page) " of " counter(pages);
            }
        }
        footer{
            page-break-after: always;
        }    
        #noPrint{
            display:none;
        }  
        #page{
            font-size: 10px;
            font-family: Arial, Helvetica, sans-serif;
        }
    }`;


  const printFn = useReactToPrint({
    contentRef: componentRef,
    pageStyle: pageStyle,
    documentTitle: `${new Date().toISOString()}_sales_reports`,
  });

  const printHandler = useCallback(() => {
    printFn();
  }, [printFn]);

  const closePrintForm = () => {
    router.push('/experiencecertificate');
  }



  return (
    <>
      <div id="noPrint" className="w-full px-4 py-2 flex justify-between items-center border-b border-gray-300">

        <h1 className="text-xl font-bold text-blue-600">Print Process Form</h1>
        <div className="w-auto flex items-center space-x-4">
          <button onClick={printHandler} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md ring-1 ring-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full p-[2px] stroke-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
          </button>

          <button onClick={closePrintForm} className="w-8 h-8 p-0.5 bg-gray-50 hover:bg-gray-300 rounded-md ring-1 ring-gray-30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full stroke-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>

      <div className="w-full h-auto p-4 overflow-auto">
        <div ref={componentRef} className="w-full h-full text-black mt-24">

          <p className="w-full text-end">Date: {formatedDateEnglish(data.dt)}</p>

          <h1 className="w-full text-center text-[20px]">To Whom It May Concern</h1>
          <br /><br />

          <p className="w-full text-justify">
          This is to certify that {data.name}, {data.gender === 'Male' ? 'son' : 'daughter'} of {data.fnm}, residing at {data.address}, was employed by our organization as a {data.post} from {formatedDateEnglish(data.dt1)}, {data.present==="1"?`and continues to hold this position`:`to ${formatedDateEnglish(data.dt2)}`}.


            <br /><br />
            We appreciate {data.gender === 'Male' ? 'his' : 'her'} hard work and dedication to our organization and wish {data.gender === 'Male' ? 'him' : 'her'} all the best in {data.gender === 'Male' ? 'his' : 'her'} future career.
          </p>

          <br />
          <p>Sincerely,</p>

          <br /><br /> <br />
          <p>
            {data.authorName}
            <br />
            {data.authorPost}
          </p>

        </div>
      </div>
    </>
  );

};

export default ExpPrint;


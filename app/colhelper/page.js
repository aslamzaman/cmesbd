"use client"
import React, { useState, useEffect } from "react";
import Edit from "@/components/participant/Edit";
import Upload from "@/components/participant/Upload";
import { DropdownEn, BtnSubmit, TextNum, BtnEn } from "@/components/Form";
import { formatedDate, sortArray } from "@/lib/utils";
import { delKeyFromIndexedDB, getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";




const Colhelper = () => {
  const [participants, setParticipants] = useState([]);
  const [waitMsg, setWaitMsg] = useState("");
  const [msg, setMsg] = useState("");

  const [unit, setUnit] = useState("");
  const [sl, setSl] = useState("");

  const mobileCheck = (number) => {
    const mobileStr = parseInt(number).toString();
    const finalMobile = mobileStr.length !== 10 || mobileStr.charAt(0) !== '1' ? '999999999' : `${mobileStr}`;
    return finalMobile;
  }

  const dtCheck = (dt) => {
    const daysCalculation = (Date.now() - new Date(dt).getTime()) / (1000 * 60 * 60 * 24 * 365);
    const yrs = Math.round(daysCalculation);
    const finalDt = yrs < 12 || yrs > 60 ? "1900-01-01" : formatedDate(dt);
    return finalDt;
  }


  useEffect(() => {
    const load = async () => {
      setWaitMsg('Please Wait...');
      try {
        const data = await getDataFromIndexedDB("participant");
        const checkData = data.map(item => {
          return {
            ...item,
            dt: dtCheck(item.dt),
            mobile: mobileCheck(item.mobile)
          }
        })
        const result = checkData.sort((a, b) => sortArray(parseInt(a.id), parseInt(b.id)));
        console.log(result);
        setParticipants(result);
        setWaitMsg('');
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, [msg]);


  const messageHandler = (data) => {
    setMsg(data);
  }




      const handleCreate = async (e) => {
        e.preventDefault();
        if (participants.length < 1) {
          setMsg("No data found!");
          return false;
        }
        setMsg("Please wait...");
        try {
          const newData = { unit: unit, sl: sl, participants: participants };
          const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/format`;
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData)
          };

          const response = await fetch(apiUrl, requestOptions);

          if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "Formater.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log("Excel file created and downloaded.");
          } else {
            throw new Error("Failed to create Excel file");
          }
          setMsg("");
        } catch (error) {
          console.error("Error saving data:", error);
        }

      }




  const downloadExcelFormat = async (e) => {
    e.preventDefault();
    setMsg("Please wait...");
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/format`;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };

      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "Participant_list.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        console.log("Excel file created and downloaded.");
      } else {
        throw new Error("Failed to create Excel file");
      }
      setMsg("");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }



  const clearDataHandler = async () => {
    try {
      await delKeyFromIndexedDB("participant");
      setMsg(`Deleted all data ${Date.now()}`);
    } catch (err) {
      console.log(err);
    }
  }




  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">CMES COL PROJECT</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>


      <div className="px-4 lg:px-6">
        <div className="w-full grid grid-cols-1 gap-y-4">
          <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">
            <div className="overflow-auto">
              <p className="w-full text-sm text-red-700">{msg}</p>



              <div className="overflow-auto">
                <div className="w-full grid grid-cols-2">
                  <div className="w-full">

                    {participants.length ? (<BtnEn Title="Clear" Click={clearDataHandler} Class="bg-blue-600 hover:bg-blue-800 text-white mb-1" />) : null}
                  </div>
                  <div className="w-full flex justify-end items-center">
                    <Upload message={messageHandler} />
                  </div>
                </div>

                <table className="w-full border border-gray-200">
                  <thead>
                    <tr className="w-full bg-gray-200">
                      <th className="text-start border-b border-gray-200 px-4 py-2">SL</th>
                      <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                      <th className="text-center border-b border-gray-200 px-4 py-2">Date</th>
                      <th className="text-center border-b border-gray-200 px-4 py-2">Mobile</th>
                      <th className="w-[100px] font-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      participants.length ? participants.map(participant => {
                        return (
                          <tr className="border-b border-gray-200 hover:bg-gray-100" key={participant.id}>
                            <td className="text-start py-2 px-4">{participant.sl}</td>
                            <td className="text-start py-2 px-4">{participant.name}</td>
                            <td className={`text-center py-2 px-4 ${participant.dt === '1900-01-01' ? 'line-through font-bold' : 'no-underline font-normal'}`}>{participant.dt}</td>
                            <td className={`text-center py-2 px-4 ${participant.mobile === '999999999' ? 'line-through font-bold' : 'no-underline font-normal'}`}>0{participant.mobile}</td>
                            <td className="flex justify-end items-center mt-1">
                              <Edit message={messageHandler} id={participant.id} data={participant} />
                            </td>
                          </tr>
                        )
                      })
                        : null
                    }
                  </tbody>
                </table>

              </div>



            </div>
          </div>

          <div className="w-full border-2 p-4 mb-32 shadow-md rounded-md">
            <form onSubmit={handleCreate}>
              <div className="grid grid-cols-1 gap-2 my-2">
                <DropdownEn Title="Select Unit" Change={e => setUnit(e.target.value)} value={unit}>
                  <option value="SRJ">SRJ</option>
                  <option value="NDR">NDR</option>
                  <option value="JAL">JAL</option>
                  <option value="DUT">DUT</option>
                  <option value="RNB">RNB</option>
                  <option value="DMK">DMK</option>
                  <option value="JNP">JNP</option>
                </DropdownEn>
                <TextNum Title="Serial Start" Id="sl" Change={e => setSl(e.target.value)} Value={sl} />
              </div>
              <div className="w-full flex justify-start">
                <BtnSubmit Title="Generate" Class="bg-blue-600 hover:bg-blue-800 text-white" />
              </div>
            </form>
            <button className="text-blue-600 underline py-4" onClick={downloadExcelFormat} >Download Excel Format</button>
          </div>



        </div>
      </div>
    </>
  )

}

export default Colhelper;

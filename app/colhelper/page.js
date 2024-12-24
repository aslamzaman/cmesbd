"use client"
import React, { useState, useEffect } from "react";
import Edit from "@/components/participant/Edit";
import Upload from "@/components/participant/Upload";
import { DropdownEn, BtnSubmit, TextNum, BtnEn } from "@/components/Form";
import { dateDifferenceInDays, formatedDate, sortArray } from "@/lib/utils";
import { delKeyFromIndexedDB, getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";

import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';


const Colhelper = () => {
  const [participants, setParticipants] = useState([]);
  const [waitMsg, setWaitMsg] = useState("");
  const [msg, setMsg] = useState("");

  const [unit, setUnit] = useState("");
  const [sl, setSl] = useState("");


  const checkDate = (dt) => {
    const days = dateDifferenceInDays(new Date(dt), new Date(), true) / 365;
    const yrs = Math.round(days);
    const isNum = yrs ? 1 : 0;
    //console.log(yrs);
    return yrs < 14 || yrs > 70 || isNum === 0 ? false : true;
  }

  const checkMobile = (number) => {
    const mobile = parseInt(number).toString();
    return mobile.charAt(0) !== '1' || mobile.length !== 10 ? false : true;
  }


  useEffect(() => {
    const load = async () => {
      setWaitMsg('Please Wait...');
      try {
        const data = await getDataFromIndexedDB("participant");
        const checkData = data.map(item => {
          return {
            ...item,
            isDate: checkDate(item.date),
            isMobile: checkMobile(item.mobile)
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
      const workbook = await XlsxPopulate.fromBlankAsync();
      const sheet = workbook.sheet("Sheet1").name("Worksheet");
      //---------------------------------------------------------
      // Header with style
      sheet.column("A").width(30).hidden(false);
      sheet.column("B").width(20).hidden(false);
      sheet.column("C").width(20).hidden(false);
      sheet.column("D").width(10).hidden(false);
      sheet.column("E").width(45).hidden(false);
      sheet.column("F").width(30).hidden(false);

      sheet.cell('A1').value("Name").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
      sheet.cell('B1').value("Date of Birth").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
      sheet.cell('C1').value("Mobile No").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
      sheet.cell('D1').value("Age").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
      sheet.cell('E1').value("Rgistration No.").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });
      sheet.cell('F1').value("Learner ID").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

      const age = (dt) => {
        const getAge = dateDifferenceInDays(dt, new Date());
        return Math.round(getAge / 365);
      }

      // Create rows
      participants.forEach((item, i) => {
        const fourDigit = `0000000${parseInt(sl) + i}`;
        const reg = `CMES-COL-${unit}-${fourDigit.slice(-4)}-${item.name}`;
        const lId = `CMES-COL-${unit}-${fourDigit.slice(-4)}`;
        //-------------------------------------------
        const mobleElevenDigit = `0000${parseInt(item.mobile)}`;
        const correctMobile = mobleElevenDigit.slice(-11);

        sheet.cell(`A${i + 2}`).value(item.name).style({ numberFormat: '@', horizontalAlignment: 'left', verticalAlignment: 'center' });
        sheet.cell(`B${i + 2}`).value(formatedDate(item.date)).style({ numberFormat: 'YYYY-MM-DD', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell(`C${i + 2}`).value(correctMobile).style({ numberFormat: '@', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell(`D${i + 2}`).value(age(item.date)).style({ numberFormat: '#,##0_);(#,##0)', horizontalAlignment: 'center', verticalAlignment: 'center' });
        sheet.cell(`E${i + 2}`).value(reg).style({ numberFormat: '@', horizontalAlignment: 'left', verticalAlignment: 'center' });
        sheet.cell(`F${i + 2}`).value(lId).style({ numberFormat: '@', horizontalAlignment: 'center', verticalAlignment: 'center' });
      })

      // Generate the Excel file as a blob
      const blob = await workbook.outputAsync();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "Formated_Participant_list.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      console.log("Excel file created and downloaded.");

      setMsg("");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }


  const downloadExcelFormat = async (e) => {
    e.preventDefault();
    setMsg("Please wait...");

    try {
      const workbook = await XlsxPopulate.fromBlankAsync();
      const sheet = workbook.sheet("Sheet1").name("Worksheet");
      //--------------------------------------------------------
      //Header with style
      sheet.column("A").width(40).hidden(false);
      sheet.cell('A1').value("Participant Name").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

      sheet.column("B").width(25).hidden(false);
      sheet.cell('B1').value("Date Of Birth").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

      sheet.column("C").width(25).hidden(false);
      sheet.cell('C1').value("Mobile No").style({ horizontalAlignment: 'center', verticalAlignment: 'center', bold: true });

      // Generate the Excel file as a buffer
      const blob = await workbook.outputAsync();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Participant_list_format.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
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
                            <td className="text-start py-2 px-4">{participant.name}</td>
                            <td className={`text-center py-2 px-4 ${participant.isDate === false ? 'line-through font-bold' : 'no-underline font-normal'}`}>{participant.date}</td>
                            <td className={`text-center py-2 px-4 ${participant.isMobile === false ? 'line-through font-bold' : 'no-underline font-normal'}`}>{participant.mobile}</td>
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
                  <option value="NDY">NDY</option>
                  <option value="JAL">JAL</option>
                  <option value="DEUTY">DEUTY</option>
                  <option value="RNB">RNB</option>
                  <option value="DAM">DAM</option>
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

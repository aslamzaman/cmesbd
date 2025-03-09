"use client";
import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextBn, TextEn, TextDt, TextareaBn} from "@/components/Form";
import Add from "@/components/bayprostab/Add";
import Edit from "@/components/bayprostab/Edit";
import Delete from "@/components/bayprostab/Delete";
import Download from '@/components/bayprostab/Download';
import Upload from '@/components/bayprostab/Upload';
import Plus from '@/components/bayprostab/Plus';


import { dateAdd, formatedDate } from '@/lib/utils';
import { bayprostabHelpers, printCentral, printCompletePlan, printGo, printBearer, tableOne, tableTwo, bearerTable, payment, paymentComplete } from '@/helpers/bayprostabHelpers';
import { localStorageRemoveItem } from "@/lib/DatabaseLocalStorage";
import { Clear } from '@/components/Icons';
import Loading from '@/components/Loading';


require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");


const Bayprostab = () => {
  const [bayprostabs, setBayprostabs] = useState([]);
  const [waitMsg, setWaitMsg] = useState('');
  const [msg, setMsg] = useState("Data ready");
  const [waitPage, setWaitPage] = useState(false);

  const [staffData, setStaffData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [staff, setStaff] = useState("Avmjvg Rvgvb");
  const [project, setProject] = useState("GO");
  const [dt, setDt] = useState("2023-01-12");
  const [dpt, setDpt] = useState("ms¯’vcb");
  const [subject, setSubject] = useState("mvwf©m †m›Uv‡ii Mvwoi R¡vjvwb (AK‡Ub) µq");
  const [note, setNote] = useState(`Mvwoi R¡vjvwb (AK‡Ub) cÖ‡qvRb Abyhvqx wewfbœ cv¤ú †_‡K µq Kiv n‡e`);
  const [total, setTotal] = useState("");
  const [budgetHead, setBudgetHead] = useState("Utilities");
  const [payType, setPayType] = useState("br");
  const [cheque, setCheque] = useState("");



  useEffect(() => {

    const getData = async () => {
      setWaitMsg('Please wait...');
      try {
        const data = await bayprostabHelpers();
        console.log(data)
        const locaData = data.localDataWithSubTotal;

        setStaffData(data.staffData);
        setProjectData(data.projectWithGO);
        setBayprostabs(locaData);
        setTotal(data.gt);

        setWaitMsg('');
        setDt(formatedDate(new Date()));
      } catch (err) {
        console.error(err);
      }
    }
    getData();

  }, [msg])


  const messageHandler = (data) => {
    setMsg(data);
  }



  const handleCreate = (e) => {
    e.preventDefault();

    if (bayprostabs.length < 1) {
      setWaitMsg("No data found!");
      return false;
    }
    setWaitPage(true);

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });

    const data = {
      name: staff,
      project: project,
      dt: dt,
      dateStart: dt,
      dateEnd: dateAdd(dt, 15),
      dpt: dpt,
      subject: subject,
      note: note,
      total: total,
      budgetHead: budgetHead,
      payType: payType,
      cheque: cheque
    }


    setTimeout(() => {
      printCentral({ doc, data });
      tableOne({ doc }, bayprostabs, 101);
      payment({ doc }, data, payType);

      doc.addPage("a4", "p");
      printCompletePlan({ doc, data });
      tableOne({ doc }, bayprostabs, 107);
      paymentComplete({ doc }, data, payType);


      if (project === 'GO') {
        doc.addPage("a4", "p");
        printGo({ doc, data });
        tableTwo({ doc }, bayprostabs, 77);
      }


      if (payType === 'br') {
        doc.addPage("a4", "p");
        printBearer({ doc, data });
        bearerTable({ doc }, bayprostabs, 121);
      }
      doc.save(new Date().toISOString() + "-Bayprostab.pdf");
      setWaitPage(false);
    }, 100);

  }



  const clearAllHandler = () => {
    if (confirm("Be careful! All data will be deleted.")) {
      try {
        const msg = localStorageRemoveItem('bayprostab');
        setMsg(msg);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMsg("Canceled!");
    }
  }



  if (waitPage) {
    return <Loading message="Please wait" />
  }




  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
        <div className="w-full border-2 p-4 shadow-md rounded-md">

          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-2">
              <div className="w-full col-span-2">
                <TextEn Title="Budget Head (English)" Id="budgetHead" Change={(e) => { setBudgetHead(e.target.value) }} Value={budgetHead} Chr="150" />
              </div>

              <DropdownEn Title="Staff Name" Id="staff" Change={(e) => { setStaff(e.target.value) }} Value={staff}>
                {staffData.map(staff => <option value={staff.nameBn} key={staff.id}>{staff.nameEn}</option>)}
              </DropdownEn>

              <DropdownEn Title="Project" Id="project" Change={(e) => { setProject(e.target.value) }} Value={project}>
                {projectData.map(project => <option value={project.name} key={project.id}>{project.name}</option>)}
              </DropdownEn>

              <TextDt Title="Date" Id="dt" Change={(e) => { setDt(e.target.value) }} Value={dt} />
              <TextBn Title="Department (SutonnyMJ)" Id="dpt" Change={(e) => { setDpt(e.target.value) }} Value={dpt} Chr="50" />

              <div className="w-full col-span-2">
                <TextBn Title="Subject (SutonnyMJ)" Id="subject" Change={(e) => { setSubject(e.target.value) }} Value={subject} Chr="100" />
              </div>


              <DropdownEn Title="Payment Type" Id="payType" Change={e => setPayType(e.target.value)} Value={payType}>
                <option value="ft">Fund Transfer</option>
                <option value="ace">A/C Pay English</option>
                <option value="acb">A/C Pay Bangla</option>
                <option value="br">Bearer Cheque</option>
              </DropdownEn>
              {
                payType === '' ? null
                  : payType === 'ft' ? null
                    : payType === 'ace' ? <TextEn Title="Name (English)" Id="cheque" Change={e => setCheque(e.target.value)} Value={cheque} Chr="100" />
                      : payType === 'acb' ? <TextBn Title="Name (SutonnyMJ)" Id="cheque" Change={e => setCheque(e.target.value)} Value={cheque} Chr="100" />
                        : null
              }

              <div className="w-full col-span-2">
                <TextareaBn Title="Notes (SutonnyMJ)" Id="note" Rows="2" Change={(e) => { setNote(e.target.value) }} Value={note} />
              </div>

            </div>
            <div className="w-full flex justify-start">
              <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
            </div>
          </form>

        </div>



        <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">

          <div className="w-full overflow-auto">

            <p className="w-full text-sm text-start text-pink-600">&nbsp;{msg}&nbsp;</p>


            <div className="w-auto flex items-center justify-end space-x-1">
              <Clear Click={clearAllHandler} Size="w-7 h-7" />
              <Plus message={messageHandler} data={bayprostabs} />
              <Download message={messageHandler} />
              <Upload message={messageHandler} />
            </div>

            <table className="w-full border border-gray-200">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                  <th className="text-start border-b border-gray-200 px-4 py-2">Item</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Nos</th>
                  <th className="text-end border-b border-gray-200 px-4 py-2">Taka</th>
                  <th className="w-[100px] font-normal">
                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                      <Add message={messageHandler} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  bayprostabs.length ? bayprostabs.map((bayprostab, i) => {
                    return (
                      <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostab.id}>
                        <td className="text-center py-2 px-4">{i + 1}.</td>
                        <td className="text-start py-2 px-4 font-sutonnyN">{bayprostab.item}</td>
                        <td className="text-center py-2 px-4">{bayprostab.nos}</td>
                        <td title={bayprostab.subtotal} className="text-end py-2 px-4">{bayprostab.taka}</td>
                        <td className="flex justify-end items-center mt-1">
                          <Edit message={messageHandler} id={bayprostab.id} data={bayprostab} />
                          <Delete message={messageHandler} id={bayprostab.id} data={bayprostab} />
                        </td>
                      </tr>
                    )
                  })
                    : null
                }

                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="font-bold"></td>
                  <td className="text-start py-2 px-4 font-bold">Total</td>
                  <td></td>
                  <td className="text-end py-2 px-4 font-bold">{total}</td>
                  <td></td>
                </tr>

              </tbody>
            </table>

          </div>

        </div>
      </div>

    </>
  )
}
export default Bayprostab;

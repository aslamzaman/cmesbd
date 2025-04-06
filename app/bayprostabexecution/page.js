"use client";
import React, { useState, useEffect } from "react";
import { BtnSubmit, DropdownEn, TextareaBn, TextDt, TextNum } from "@/components/Form";
import { jsPDF } from "jspdf";
import Add from "@/components/bayprostabexecution/Add";
import Edit from "@/components/bayprostabexecution/Edit";
import Delete from "@/components/bayprostabexecution/Delete";
import Download from '@/components/bayprostabexecution/Download';
import Upload from '@/components/bayprostabexecution/Upload';
import Plus from '@/components/bayprostabexecution/Plus';


import { formatedDate } from "@/lib/utils";
require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");
import { getIndexedDbData, getLocalData, printHeaderFooter, table } from '@/helpers/bayprostabexecutionHelpers';
import { localStorageRemoveItem } from "@/lib/DatabaseLocalStorage";
import { Clear } from "@/components/Icons";
import Loading from '@/components/Loading';


const Bayprostabexecution = () => {
  const [staffData, setStaffData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [bayprostabexecutions, setBayprostabexecutions] = useState([]);

  const [msg, setMsg] = useState("Data ready");
  const [waitMsg, setWaitMsg] = useState("");
  const [waitPage, setWaitPage] = useState(false);

  const [staff, setStaff] = useState("");
  const [project, setProject] = useState("");

  const [dt1, setDt1] = useState("");
  const [dt2, setDt2] = useState("");
  const [advance, setAdvance] = useState(3000);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState("");



  useEffect(() => {
    const getData = async () => {
      setWaitMsg("Please wait...");
      try {
        const data = await getIndexedDbData();
        setStaffData(data.staffData);
        setProjectData(data.projectWithGO);
        //---------------------------------------------------
        const local = getLocalData();
        console.log(local);
        setBayprostabexecutions(local.data);
        setTotal(local.gt);

        setDt2(formatedDate(new Date()));
        setWaitMsg("");
      } catch (err) {
        console.log(err);
      }
    }
    getData();

  }, [msg])


  const messageHandler = (data) => {
    setMsg(data);
  }

  const createHandler = async (e) => {
    e.preventDefault();
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });


    if (bayprostabexecutions.length < 1) {
      setWaitMsg("No data!!");
      return false;
    }
    setWaitPage(true);
    setTimeout(() => {
      const data = { staff, project, dt1, dt2, advance, note, total };
      printHeaderFooter({ doc }, data);
      table({ doc }, bayprostabexecutions);
      doc.save(new Date().toISOString() + "Bayprostab-Execution.pdf");
      setWaitPage(false);
    }, 0);
  }


  const clearAllHandler = () => {
    if (confirm("Be careful! All data will be deleted.")) {
      try {
        const msg = localStorageRemoveItem('bayprostabexecution');
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
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Bayprostab Execution</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
        <div className="w-full border-2 p-4 shadow-md rounded-md">

          <form onSubmit={createHandler}>
            <div className="grid grid-cols-1 gap-2 my-2">
              <DropdownEn Title="Staff" Id="staff" Change={e => setStaff(e.target.value)} Value={staff}>
                {staffData.length ? staffData.map(staff => <option value={staff.nameBn} key={staff.id}>{staff.nameEn}</option>) : null}
              </DropdownEn>
              <DropdownEn Title="Project *" Id="project" Data={projectData} Change={e => setProject(e.target.value)} Value={project}>
                {projectData.length ? projectData.map(project => <option value={project.name} key={project.id}>{project.name}</option>) : null}
              </DropdownEn>

              <div className="w-full flex flex-col items-start">
                <label className='text-xs font-semibold mb-1 opacity-50' htmlFor="dt1">Advance Date</label>
                <input onChange={e => setDt1(e.target.value)} value={dt1} type="date" id="dt1" name="dt1" className="w-full px-4 py-1.5 text-gray-600 ring-1 focus:ring-4 ring-blue-300 outline-none rounded duration-300" />
              </div>

              <TextDt Title="Executon Date *" Id="dt2" Change={e => setDt2(e.target.value)} Value={dt2} />
              <TextNum Title="Advance Taka *" Id="dt2" Change={e => setAdvance(e.target.value)} Value={advance} />
              <TextareaBn Title="Note (SutonnyMJ)" Id="note" Rows="1" Change={e => setNote(e.target.value)} Value={note} />
            </div>
            <div className="w-full flex justify-start">
              <BtnSubmit Title="Create PDF" Class="bg-blue-600 hover:bg-blue-800 text-white" />
            </div>
          </form>
        </div>
        <div className="w-full col-span-2 border-2 p-4 shadow-md rounded-md">

          <div className="overflow-auto">
            <p className="w-full text-sm text-red-700">{msg}</p>


            <div className="w-auto flex items-center justify-end space-x-1">
              <Clear Click={clearAllHandler} Size="w-7 h-7" />
              <Plus message={messageHandler} data={bayprostabexecutions} />
              <Download message={messageHandler} />
              <Upload message={messageHandler} />
            </div>


            <table className="w-full border border-gray-200">
              <thead>
                <tr className="w-full bg-gray-200">
                  <th className="text-center border-b border-gray-200 px-4 py-2">SL</th>
                  <th className="text-start border-b border-gray-200 px-4 py-2">Item</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Nos</th>
                  <th className="text-center border-b border-gray-200 px-4 py-2">Taka</th>
                  <th className="w-[100px] font-normal">
                    <div className="w-full flex justify-end mt-1 pr-[3px] lg:pr-2">
                      <Add message={messageHandler} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  bayprostabexecutions.length ? bayprostabexecutions.map((bayprostabexecution, i) => {
                    return (
                      <tr className="border-b border-gray-200 hover:bg-gray-100" key={bayprostabexecution.id}>
                        <td className="text-center py-2 px-4">{i + 1}.</td>
                        <td className="text-start py-2 px-4 font-sutonnyN">{bayprostabexecution.item}</td>
                        <td className="text-center py-2 px-4">{bayprostabexecution.nos}</td>
                        <td title={bayprostabexecution.subtotal} className="text-center py-2 px-4">{bayprostabexecution.taka}</td>
                        <td className="flex justify-end items-center mt-1">
                          <Edit message={messageHandler} id={bayprostabexecution.id} data={bayprostabexecution} />
                          <Delete message={messageHandler} id={bayprostabexecution.id} data={bayprostabexecution} />
                        </td>
                      </tr>
                    )
                  })
                    : null
                }

                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="font-bold"></td>
                  <td></td>
                  <td></td>
                  <td className="text-center py-2 px-4 font-bold">{total}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </>
  );


};
export default Bayprostabexecution;

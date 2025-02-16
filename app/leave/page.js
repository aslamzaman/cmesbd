"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { BtnSubmit, DropdownEn, TextDt, TextBn, TextareaBn } from "@/components/Form";

require("@/public/fonts/SUTOM_MJ-normal");
require("@/public/fonts/SUTOM_MJ-bold");

import { dateDifferenceInDays, formatedDate, formatedDateDot, inwordBangla, sortArray } from "@/lib/utils";
import { getDataFromIndexedDB } from "@/lib/DatabaseIndexedDB";



const LeavePage = () => {
  const [nm, setNm] = useState("");
  const [dt1, setDt1] = useState("");
  const [dt2, setDt2] = useState("");
  const [cause, setCause] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");

  const [staffData, setStaffData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [waitMsg, setWaitMsg] = useState("");



  useEffect(() => {
    const getData = async () => {
      setWaitMsg("Please wait...");
      try {
        const [staffs, projects] = await Promise.all([
          getDataFromIndexedDB("staff"),
          getDataFromIndexedDB("project")
        ]);
        const sortStaff = staffs.sort((a,b)=> sortArray(a.nameEn.toUpperCase(), b.nameEn.toUpperCase()));

        setStaffData(sortStaff);
        setProjects(projects);
        setWaitMsg("");
      } catch (err) {
        console.log(err);
      }
    }
    getData();
    const date1 = formatedDate(new Date());
    setDt1(date1);
    setDt2(date1);
    setCause("cvwievwiK Kv‡Ri Rb¨");
    setDescription("");

  }, [])



  const daylast = () => {
    let l1 = dateDifferenceInDays(new Date(), dt1, false);
    let l2 = dateDifferenceInDays(new Date(), dt2, false);
    const diff = dateDifferenceInDays(dt1, dt2, true);
    let st = "";
    if (l1 === 0 && l2 === 0) {
      st = `AvR ${formatedDateDot(dt1, true)} ZvwiL  1(GK) ) w\`b Awd‡m Dcw¯’Z _vK‡Z cviwQ bv |`;
    } else if (l1 < 0 && l2 < 0) {
      st = `MZ ${formatedDateDot(dt1, true)} ZvwiL n‡Z ${formatedDateDot(dt2, true)} ZvwiL ch©šÍ †gvU ${diff}(${inwordBangla(diff)}) w\`b Awd‡m Dcw¯’Z n‡Z cvwi bvB|`;
    } else if (l1 < 0 && l2 > 0) {
      st = `MZ ${formatedDateDot(dt1, true)} ZvwiL n‡Z AvMvgx ${formatedDateDot(dt2, true)} ZvwiL ch©šÍ †gvU ${diff}(${inwordBangla(diff)}) w\`b Awd‡m Dcw¯’Z _vK‡Z cvi‡ev bv |`
    } else if (l1 > 0 && l2 > 0) {
      st = `AvMvgx ${formatedDateDot(dt1, true)} ZvwiL n‡Z ${formatedDateDot(dt2, true)} ZvwiL ch©šÍ †gvU ${diff}(${inwordBangla(diff)}) w\`b Awd‡m Dcw¯’Z _vK‡Z cvi‡ev bv |`
    } else {
      st = '';
    }
    return st;
  }


  const createApplication = () => {
    const diff = dateDifferenceInDays(dt1, dt2, true);
    let ss = daylast();
    const appText = `webxZ wb‡e\`b GB †h, ${cause} ${ss}
       
AZGe, Dc‡iv³ welqwU we‡ePbv K‡i Avgv‡K ${diff}(${inwordBangla(diff)}) w\`‡bi QywU gbRyi K‡i evwaZ Ki‡eb|
`;
    setDescription(appText);
    setWaitMsg("Ok! Ready to create pdf");
  }


  const createHandler = (e) => {
    e.preventDefault();
    const diff = dateDifferenceInDays(dt1, dt2, true);
    if (description === "") {
      setWaitMsg("Click on 'Create Application' button");
      return false;
    }
    setWaitMsg("Please wait...");
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });

    setTimeout(() => {
      const s = nm.split(',');
      doc.addImage("/images/formats/leave.png", "PNG", 0, 0, 210, 297);
      doc.setFont("SutonnyMJ", "normal");
      doc.setFontSize(14);
      //----------------------------------------------------
      doc.text(`${formatedDateDot(new Date(), true)}`, 169, 40 - 1, null, null, "left"); // date
      doc.text(`${s[0]}`, 59, 50 - 1, null, null, "center"); // name
      doc.text(`${s[1]}`, 130, 50 - 1, null, null, "center");  // post
      doc.setFont("times", "normal");
      doc.setFontSize(13);
      doc.text(`${project}`, 186, 50 - 1, null, null, "center");   // project
      doc.setFont("SutonnyMJ", "normal");
      doc.setFontSize(14);
      doc.text(`${cause}`, 55, 60 - 1, null, null, "left");
      doc.text(`${formatedDateDot(dt1, true)}`, 70.5, 70 - 1, null, null, "center");
      doc.text(`${formatedDateDot(dt2, true)}`, 120.5, 70 - 1, null, null, "center");
      doc.text(`${diff}`, 162.5, 70 - 1, null, null, "center");

      doc.text(`${description}`, 20, 121.5, { maxWidth: 178, align: 'justify' });
      doc.text(`${diff}`, 60, 244 - 1, null, null, "center");
      doc.text(`${diff}`, 172, 244 - 1, null, null, "center");
      setWaitMsg("");
      doc.save(`${new Date().toISOString()}-leave-application.pdf`);
    }, 0);
  }



  return (
    <>
      <div className="w-full mb-3 mt-8">
        <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Leave Application</h1>
        <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
      </div>

      <div className="px-4 lg:px-6">
        <div className="w-full md:w-3/4 mx-auto mb-10 bg-white border-2 border-gray-300 rounded-md shadow-md duration-300">
          <div className="w-full p-4">
            <form onSubmit={createHandler}>
              <div className="grid grid-cols-2 gap-2 my-2">
                <DropdownEn Title="Staff Name" Id="nm" Change={e => setNm(e.target.value)} Value={nm}>
                  {staffData.length ? staffData.map(staff => <option value={`${staff.nameBn},${staff.postBn}`} key={staff.id}>{staff.nameEn}</option>) : null}
                </DropdownEn>

                <DropdownEn Title="Project" Id="project" Change={e => setProject(e.target.value)} Value={project}>
                  {projects.length ? projects.map(project => <option value={`${project.name}`} key={project.id}>{project.name}</option>) : null}
                </DropdownEn>

                <TextDt Title="Start Date" Id={dt1} Change={e => setDt1(e.target.value)} Value={dt1} />
                <TextDt Title="End Date" Id={dt2} Change={e => setDt2(e.target.value)} Value={dt2} />

                <TextBn Title="Cause (SutonnyMJ)" Id={cause} Change={e => e.target.value} Value={cause} Chr="250" />

                <div>
                  <input type="button" onClick={createApplication} value="Create Application" className="bg-pink-600 hover:bg-pink-800 text-white text-center mt-4 mx-0.5 px-4 py-2 font-semibold rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 cursor-pointer" />
                </div>
                <div className="col-span-2">
                <TextareaBn Title="Description (SutonnyMJ)" Id={description} Rows="4" Change={e => setDescription(e.target.value)} Value={description} />
                </div>
              </div>
              <div className="w-full flex justify-start">
                <BtnSubmit Title="Create Pdf" Class="bg-blue-600 hover:bg-blue-800 text-white" />
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );

};
export default LeavePage;

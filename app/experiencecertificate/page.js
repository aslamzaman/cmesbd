"use client"
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { TextEn, BtnSubmit, DropdownEn, TextDt } from "../../components/Form";
import { dateAdd, formatedDate, formatedDateDot, localStorageSetItem, sortArray } from "@/lib/utils";
import { getDataFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
import { useRouter } from "next/navigation";



const Experiencecertificate = () => {
  const [msg, setMsg] = useState("");
  const [dt, setDt] = useState("");
  const [dt1, setDt1] = useState("");
  const [dt2, setDt2] = useState("");
  const [nm, setNm] = useState("");
  const [present, setPresent] = useState('');
  const [fnm, setFnm] = useState("");
  const [address, setAddress] = useState("");
  const [certify, setCertify] = useState("");

  const [staffs, setStaffs] = useState([]);
  const [authors, setAuthors] = useState([]);


  const router = useRouter();



  useEffect(() => {
    const getData = async () => {
      try {
        const [staffs, authors] = await Promise.all([
          getDataFromIndexedDB("staff"),
          getDataFromIndexedDB("author")
        ]);
        const sortStaff = staffs.sort((a, b) => sortArray(a.nameEn.toUpperCase(), b.nameEn.toUpperCase()));
        setStaffs(sortStaff);
        setAuthors(authors);
        //---------------------------------------
        const localData = localStorage.getItem('exp');
        if (localData) {
          const jsonData = JSON.parse(localData);

          const name = `${jsonData.name},${jsonData.gender},${jsonData.post}`;
          const authorNm = `${jsonData.authorName},${jsonData.authorPost}`;
          setDt(jsonData.dt);
          setDt1(jsonData.dt1);
          setDt2(jsonData.dt2);
          setNm(name);
          setFnm(jsonData.fnm);
          setAddress(jsonData.address);
          setPresent(jsonData.present);
          setCertify(authorNm);
        }

      } catch (err) {
        console.log(err);
      }
    }
    getData();
    const tenYrsBack = 365 * 15;
    const backDate = dateAdd(new Date(), -tenYrsBack);
    setDt(formatedDate(new Date()));
    setDt1(formatedDate(backDate));
    setDt2(formatedDate(new Date()));
  }, [])



  const createCertificate = (e) => {
    e.preventDefault();
    const splitName = nm.split(",");
    const name = splitName[0];
    const gender = splitName[1];
    const post = splitName[2];

    const splitAuthor = certify.split(",");
    const authorName = splitAuthor[0];
    const authorPost = splitAuthor[1];

    const data = { dt, dt1, dt2, name, gender, post, present, fnm, address, authorName, authorPost };
    localStorage.setItem('exp', JSON.stringify(data));
    router.push("/experiencecertificateprint");
  }





  return (
    <>
      <div className="w-full mb-3 mt-8">
        <div className="w-full mb-3 mt-8">
          <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Experience Certificate</h1>
        </div>

        <div className="w-11/12 lg:w-9/12 mx-auto mt-10 p-4 border shadow-lg">
          <form onSubmit={createCertificate}>
            <div className="grid grid-col-3 gap-4">
              <TextDt Title="Certificate Issue Date" Id="dt" Change={e => setDt(e.target.value)} Value={dt} />
              <TextDt Title="Joining Date" Id="dt1" Change={e => setDt1(e.target.value)} Value={dt1} />
              <TextDt Title="End Date" Id="dt2" Change={e => setDt2(e.target.value)} Value={dt2} />

              <DropdownEn Title="Name" Id="nm" Change={e => setNm(e.target.value)} Value={nm}>
                {staffs.length ? staffs.map(staff => <option value={`${staff.nameEn},${staff.gender},${staff.postEn}`} key={staff.id}>{staff.nameEn}</option>) : null}
              </DropdownEn>
              <TextEn Title="Father's Name" Id="fnm" Change={(e) => setFnm(e.target.value)} Value={fnm} Chr="50" />
              <DropdownEn Title="Status" Id="present" Change={e => setPresent(e.target.value)} Value={present}>
                <option value="1">Present Staff</option>
                <option value="2">Terminate Staff</option>
              </DropdownEn>

              <div className="col-span-3">
                <TextEn Title="Full Address" Id="address" Change={(e) => setAddress(e.target.value)} Value={address} Chr="150" />
              </div>

              <div className="col-span-3">
                <DropdownEn Title="Certifying Person" Id="certify" Change={e => setCertify(e.target.value)} Value={certify}>
                  {authors.map(author => <option value={`${author.name},${author.post}`} key={author.id}>{author.name}</option>)}
                </DropdownEn>

              </div>
            </div>
            <p className="text-sm font-semibold text-red-800 mt-4">{msg}</p>
            <BtnSubmit Title="Create" Class="bg-slate-600 hover:bg-slate-800 text-white" />
          </form >
        </div>
      </div >
    </>
  )
}

export default Experiencecertificate;

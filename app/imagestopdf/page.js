"use client";
import { BtnSubmit, DropdownEn, TextEn } from "@/components/Form";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";




const Imagestopdf = () => {

    const [imageDatas, setImageDatas] = useState("");
    const [qt, setQt] = useState("");
    const [activity, setActivity] = useState("1322.1");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        setMsg("");
        setImageDatas([]);
    }, [])




    const convertPxToMm = (n) => {
        return Math.round(n / 3.7795275591);
    }



    const getImageWidthHeight = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                const imgWidth = convertPxToMm(img.width);
                const imgHeight = convertPxToMm(img.height);
                resolve({ imgWidth, imgHeight });
            };
            img.onerror = (error) => reject(error);
        });
    };

    const fileChangeHandlerImage = async (e) => {
        try {
            const files = e.target.files;
            const imageDataPromises = Array.from(files).map(async (file) => {
                const imagBlobUrl = URL.createObjectURL(file);
                const { imgWidth, imgHeight } = await getImageWidthHeight(imagBlobUrl);
                return {
                    url: imagBlobUrl,
                    width: imgWidth,
                    height: imgHeight,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                };
            });

            const imageData = await Promise.all(imageDataPromises);
            console.log(imageData);
            setImageDatas(imageData);
        } catch (error) {
            console.error("Error processing images:", error);
        }
    };

    //---------------------------------------------------------------



    const cropLandscape = (w, h) => {
        let width = 0;
        let height = 0;
        if (w >= 170) {
            width = 170;
            height = Math.round((170 / w) * h);
        } else {
            width = w;
            height = h;
        }
        console.log({width, height})
        return { width, height };
    }

    const cropPotrait = (w, h) => {
        let width = 0;
        let height = 0;
        if (h >= 242) {
            width = Math.round((242 / h) * w);
            height = 242;
        } else {
            width = w;
            height = h;
        }
        console.log({width, height})
        return { width, height };
    }





    //------------------------------------------

    const unit = ['SRJ', 'DEUTY', 'DAM', 'JAL', 'NDR', 'RNB', 'JNP'];



    const createPdfHandler = (e) => {
        e.preventDefault();
        if (imageDatas.length.length < 1) {
            return false;
        }

        try {
            const doc = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });

            setMsg("Please wait...");
            //--------------------------------------------------------------------
            setTimeout(() => {
                imageDatas.forEach((item) => {
                    const ratio = parseInt(item.width) / parseInt(item.height);
                    console.log(ratio > 1 ? "land" : "port");
                    let img = {};
                    if (ratio > 1) {
                        img = cropLandscape(item.width, item.height);
                    } else {
                        img = cropPotrait(item.width, item.height);
                        console.log(img)
                    }

      
                    const x = Math.round((210 - img.width) / 2);
                    const y = Math.round((297 - img.height) / 3);

                    doc.addImage(`${item.url}`, "PNG", x, y, img.width, img.height);


                    const nm = item.name;
                    const splitNm = nm.split(".");
                    const firstPart = splitNm[0];
                    const secondPart = splitNm[1];
                    const thirdPart = splitNm[2];
                    let st = "";
                    if (splitNm.length === 2) {
                        st = `Activity_${activity}_${qt}_CMES(${unit[firstPart - 1]}).${secondPart}`;
                    } else {
                        st = `Activity_${activity}_${qt}_CMES(${unit[firstPart - 1]}_${secondPart}).${thirdPart}`;
                    }

                    const textY = y + img.height + 10;
                    //  const nm = `Activity_${activity}_${qt} _CMES(${unit[i]}).png`;
                    doc.text(`${st} `, 105, textY, null, null, "center");
                    doc.addPage();
                })
                doc.deletePage(imageDatas.length + 1);
                doc.save(new Date().toISOString() + "-CMES-COL.pdf");
                setMsg("PDF created completed.");
                setImageDatas([]);
            }, 100);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="bg-gray-100 py-4 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-500">Images to PDF</h1>
                <h1 className="text-center text-xl font-bold text-blue-500">{msg}</h1>
            </div>


            <div className="w-full lg:w-3/4 p-4 mx-auto mt-20 grid grid-cols-1 border-2 border-gray-400 shadow-lg rounded-lg">
                <form onSubmit={createPdfHandler}>
                    <div className="w-full grid grid-cols-3 gap-3 border p-4">
                        <div className="mt-4">
                            <input type="file" onChange={fileChangeHandlerImage} accept=".jpg, .jpeg, .png, .bmp" multiple />
                        </div>
                        <DropdownEn Title="Quarter" Id="qt" Change={e => setQt(e.target.value)} Value={qt}>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </DropdownEn>
                        <TextEn Title="Activity" Id="activity" Change={e => setActivity(e.target.value)} Value={activity} Chr={150} />
                    </div>
                    <BtnSubmit Title="Create PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />
                </form>
            </div>
        </>
    )

}

export default Imagestopdf;

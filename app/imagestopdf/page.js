"use client";
import React, { useEffect, useState } from "react";
import { BtnSubmit, DropdownEn, TextEn } from "@/components/Form";
import imageCompression from 'browser-image-compression';
import { jsPDF } from "jspdf";


const Imagestopdf = () => {

    const [imageDatas, setImageDatas] = useState("");
    const [qt, setQt] = useState("");
    const [yr, setYr] = useState("");
    const [event, setEvent] = useState("");
    const [activity, setActivity] = useState("1322.1");
    const [msg, setMsg] = useState("");
    const [btnPrint, setBtnPrint] = useState(false);


    useEffect(() => {
        setMsg("");
        setImageDatas([]);
    }, [])



    const getImageWidthHeight = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                const imgWidth = img.width;
                const imgHeight = img.height;
                const orientation = imgWidth / imgHeight > 1 ? 'landscape' : 'portrait';
                resolve({ imgWidth, imgHeight, orientation });
            };
            img.onerror = (error) => reject(error);
        });
    };

    const compressedImage = (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    maxSizeMB: 0.5, // Maximum size in MB
                    maxWidthOrHeight: 1024, // Maximum width or height
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(file, options);
                const url = URL.createObjectURL(compressedFile);
                resolve(url);
            } catch (error) {
                console.error('Error compressing the image:', reject(error));
            }
        })
    }

    const fileChangeHandlerImage = async (e) => {
        setBtnPrint(false);
        setMsg("Please wait. Image compresing and loading...");
        try {
            const files = e.target.files;
            const imageDataPromises = Array.from(files).map(async (file) => {
                const dataUrl = await compressedImage(file);
                const { imgWidth, imgHeight, orientation } = await getImageWidthHeight(dataUrl);
                const type2 = file.type
                    .split("/")[1]
                    .toUpperCase();
                console.log(type2);

                return {
                    url: dataUrl,
                    width: imgWidth,
                    height: imgHeight,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    type2: type2,
                    orientation: orientation
                };
            });

            const imageData = await Promise.all(imageDataPromises);
            console.log(imageData);
            setImageDatas(imageData);
            setMsg("Ready to creating pdf.");
            setBtnPrint(true);
        } catch (error) {
            console.error("Error processing images:", error);
        }
    };

    //---------------------------------------------------------------

    const createPdfHandler = (e) => {
        e.preventDefault();
        if (imageDatas.length.length < 1) {
            return false;
        }

        try {
            const unit = ['', 'SRJ', 'DEUTY', 'DAM', 'JAL', 'NDR', 'RNB', 'JNP', 'HQ'];
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: 'a4',
                putOnlyUsedFonts: true
            });

            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();
            doc.text("Aslam", 10, 10, null, null, "left");

            setMsg("Please wait...");
            //--------------------------------------------------------------------
            setTimeout(() => {
                imageDatas.forEach((item) => {

                    const orientation = item.orientation;
                    doc.addPage('a4', `${orientation}`);

                    const imageWidth = item.width * 0.5;
                    const imageHeight = item.height * 0.5;

                    let x = 0;
                    let y = 0;
                    let textLeft = 0;
                    if (orientation === 'landscape') {
                        x = (pdfWidth - imageWidth) / 2;
                        y = (pdfHeight - imageHeight) / 2;
                        textLeft = pdfWidth / 2;
                    } else {
                        x = (pdfHeight - imageWidth) / 2;
                        y = (pdfWidth - imageHeight) / 2;
                        textLeft = pdfHeight / 2;

                    }
                    //  console.log({ x, y, pw: pdfWidth, ph: pdfHeight, w: imageWidth, h: imageHeight })

                    doc.addImage(`${item.url}`, `${item.type2}`, x, y, imageWidth, imageHeight);

                    const nm = item.name;
                    const ln = nm.length - 1;
                    const firstPart = parseInt(nm.charAt(0));
                    const secondPart = nm.slice(-ln);
                    // let st = `Activity_${activity}_${qt}_CMES_${unit[firstPart]}${secondPart}`;
                    let st = `Picture_${event}_${activity}_${qt}_${yr}_CMES_${unit[firstPart]}${secondPart}`;

                    const textY = y + imageHeight + 15;
                    doc.text(`${st} `, textLeft, textY, null, null, "center");

                })
                doc.deletePage(1);
                doc.save(`Picture_${event}_${activity}_${qt}_${yr}_CMES.pdf`);
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


            <div className="w-full lg:w-10/12 p-4 mx-auto mt-20 grid grid-cols-1 border-2 border-gray-400 shadow-lg rounded-lg">
                <form onSubmit={createPdfHandler}>
                    <div className="w-full grid grid-cols-6 gap-2 border p-4">
                        <div className="col-span-2 mt-4">
                            <input type="file" onChange={fileChangeHandlerImage} accept=".jpg, .jpeg, .png, .bmp" multiple />
                        </div>
                        <DropdownEn Title="Quarter" Id="qt" Change={e => setQt(e.target.value)} Value={qt}>
                            <option value="Q1">Q1</option>
                            <option value="Q2">Q2</option>
                            <option value="Q3">Q3</option>
                            <option value="Q4">Q4</option>
                        </DropdownEn>

                        <DropdownEn Title="Year" Id="yr" Change={e => setYr(e.target.value)} Value={yr}>
                            <option value="Y2">Y2</option>
                            <option value="Y3">Y3</option>
                            <option value="Y4">Y4</option>
                            <option value="Y5">Y5</option>
                        </DropdownEn>
                        <DropdownEn Title="Event" Id="event" Change={e => setEvent(e.target.value)} Value={event}>
                            <option value="Training">Training</option>
                            <option value="Awarness">Awarness</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Mobilize">Mobilize</option>
                            <option value="Campaign">Campaign</option>
                            <option value="Collaboration">Collaboration</option>
                            <option value="Reintegrating">Reintegrating</option>
                            <option value="Employment">Employment</option>
                            <option value="Legal service">Legal service</option>
                            <option value="Club">Club</option>
                            <option value="Skills training">Skills training</option>
                            <option value="Connect and support">Connect and support</option>
                            <option value="Microfinancing and Bank credit">Microfinancing and Bank credit</option>
                             <option value="Legal Document">Legal Document</option>
                        </DropdownEn>
                        <TextEn Title="Activity" Id="activity" Change={e => setActivity(e.target.value)} Value={activity} Chr={150} />
                    </div>
                    {btnPrint ? (<BtnSubmit Title="Create PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />) : null}
                </form>
            </div>
        </>
    )

}

export default Imagestopdf;

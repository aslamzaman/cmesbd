"use client";
import React, { useEffect, useState } from "react";
import { BtnSubmit, DropdownEn, TextEn } from "@/components/Form";
import imageCompression from 'browser-image-compression';
import { jsPDF } from "jspdf";



const Imagestopdf = () => {

    const [imageDatas, setImageDatas] = useState("");
    const [qt, setQt] = useState("");
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
                    maxSizeMB: 0.45, // Maximum size in MB
                    maxWidthOrHeight: 960, // Maximum width or height
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
        setMsg("Please wait. Files are loading...");
        try {
            const files = e.target.files;
            const imageDataPromises = Array.from(files).map(async (file) => {
                const dataUrl = await compressedImage(file);
                const { imgWidth, imgHeight, orientation } = await getImageWidthHeight(dataUrl);
                const type1 = file.type
                    .split("/")[1]
                    .toUpperCase();

                return {
                    url: dataUrl,
                    width: imgWidth,
                    height: imgHeight,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    orientation: orientation,
                    type1: type1,
                };
            });

            const imageData = await Promise.all(imageDataPromises);
            console.log(imageData);
            setImageDatas(imageData);
            setBtnPrint(true);
            setMsg("Files was loaded.");
        } catch (error) {
            console.error("Error processing images:", error);
        }
    };

    //---------------------------------------------------------------



    const cropLandscape = (w, h) => {
        let width = 0;
        let height = 0;
        if (w >= 517) {
            width = 517;
            height = Math.round((517 / w) * h);
        } else {
            width = w;
            height = h;
        }
        // console.log({width, height})
        return { width, height };
    }

    const cropPotrait = (w, h) => {
        let width = 0;
        let height = 0;
        if (h >= 338) {
            width = Math.round((338 / h) * w);
            height = 338;
        } else {
            width = w;
            height = h;
        }
        // console.log({width, height})
        return { width, height };
    }




    //------------------------------------------




    const createPdfHandler = (e) => {
        e.preventDefault();
        if (imageDatas.length.length < 1) {
            return false;
        }

        try {
            const unit = ['', 'SRJ', 'DEUTY', 'DAM', 'JAL', 'NDR', 'RNB', 'JNP'];
            const doc = new jsPDF({
                orientation: 'l',
                unit: 'px',
                format: 'a4',
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });

            // 446.46 631.4175
            setMsg("Please wait...");
            //--------------------------------------------------------------------
            setTimeout(() => {
                imageDatas.forEach((item) => {

                    const orientation = item.orientation;
                    let img = {};
                    if (orientation === 'landscape') {
                        img = cropLandscape(item.width, item.height);
                    } else {
                        img = cropPotrait(item.width, item.height);
                    }

                    const x = Math.round((631.4175 - img.width) / 2);
                    const y = Math.round((446.46 - img.height) / 2) - 10;
                    
                    doc.addImage(`${item.url}`, `${item.type1}`, x, y, img.width, img.height);


                    const nm = item.name;
                    const ln = nm.length - 1;
                    const firstPart = parseInt(nm.charAt(0));
                    const secondPart = nm.slice(-ln);
                    let st = `Activity_${activity}_${qt}_CMES_${unit[firstPart]}${secondPart}`;

                    const textY = y + img.height + 15;
                    doc.text(`${st} `, 316, textY, null, null, "center");
                    doc.addPage();
                })
                doc.deletePage(imageDatas.length + 1);
                const fileName = `Activity_${activity}_${qt}_CMES.pdf`;
                doc.save(fileName);
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
                    {btnPrint ? (<BtnSubmit Title="Create PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />) : null}
                </form>
            </div>
        </>
    )

}

export default Imagestopdf;

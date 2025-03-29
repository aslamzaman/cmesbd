"use client";
import React, { useEffect, useState } from "react";
import { BtnSubmit } from "@/components/Form";
import imageCompression from 'browser-image-compression';
import { jsPDF } from "jspdf";
import { delay } from "@/lib/utils";
import LoadingDot from "@/components/LoadingDot";
import { del } from "idb-keyval";



const Mergeimages = () => {

    const [imageDatas, setImageDatas] = useState("");
    const [msg, setMsg] = useState("");
    const [btnPrint, setBtnPrint] = useState(false);
    const [busy, setBusy] = useState(false);


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
        setBusy(true);
        setMsg("Please wait. Image compresing and loading...");
        try {
            const files = e.target.files;
            console.log(files);

            const imageDataPromises = Array.from(files).map(async (file, i) => {
                // For pdf file creating a smallar size, bigger image compressed
                const dataUrl = await compressedImage(file);
                const { imgWidth, imgHeight, orientation } = await getImageWidthHeight(dataUrl);
                const type2 = file.type
                    .split("/")[1]
                    .toUpperCase();
                // console.log(type2);
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
            await delay(100);
            setMsg("Ready to creating pdf.");
            setBtnPrint(true);
            setBusy(false);
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
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: 'a4',
                putOnlyUsedFonts: true
            });

            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();

            // Frirs page in landscape
            doc.text("Aslam", 10, 10, null, null, "left");

            setMsg("Please wait...");
            setBusy(true);
            //--------------------------------------------------------------------
            setTimeout(() => {
                imageDatas.forEach((item) => {

                    const orientation = item.orientation;
                    doc.addPage('a4', `${orientation}`);

                    /* When the image was commressed the maximum size of images was set to 1024 pixels. */
                    const imageWidth = item.width * 0.5;
                    const imageHeight = item.height * 0.5;

                    // Image was setup at cemter positions
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

                    doc.addImage(`${item.url}`, `${item.type2}`, x, y, imageWidth, imageHeight);
                })

                // First page only print aslam. It is starting page. From the second page get right orientation 
                doc.deletePage(1);
                doc.save(`Merges_Photo.pdf`);
                setMsg("PDF created completed.");
                setImageDatas([]);
                setBusy(false);
            }, 100);

        } catch (error) {
            console.log(error);
        }
    }





    return (
        <>
            {busy ? <LoadingDot message="Please wait. Image compresing and loading" /> : null}


            <div className="bg-gray-100 py-4 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-500">Merge Images to PDF</h1>
                <h1 className="text-center text-sm lg:text-lg font-bold text-blue-500">{msg}</h1>
            </div>


            <p className="px-4 text-center text-gray-500">Create a PDF file with multiple images</p>
            <div className="w-full lg:w-10/12 p-4 mx-auto my-4 grid grid-cols-1 border-2 border-gray-400 shadow-lg rounded-lg">
                <form onSubmit={createPdfHandler}>
                    <div className="w-full grid grid-cols-6 gap-2 border p-4">
                        <div className="col-span-2 mt-4">
                            <input type="file" onChange={fileChangeHandlerImage} accept=".jpg, .jpeg, .png, .bmp" multiple />
                        </div>
                    </div>
                    <div className="px-4">
                        {btnPrint ? (<BtnSubmit Title="Create PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />) : null}
                    </div>
                </form>
            </div>
        </>
    )

}

export default Mergeimages;

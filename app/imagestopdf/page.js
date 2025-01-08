"use client";
import { BtnSubmit } from "@/components/Form";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";





const Imagestopdf = () => {

    const [imageDatas, setImageDatas] = useState("");
    const [msg, setMsg] = useState("");


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

    const convertPxToMm = (n) => {
        return Math.round(n / 3.7795275591);
    }

    const cropLandscape = (w, h) => {
        let width = 0;
        let height = 0;
        if (convertPxToMm(w) > 170) {
            width = 170;
            height = Math.round((170 / convertPxToMm(w)) * convertPxToMm(h));
        } else {
            width = convertPxToMm(w);
            height = convertPxToMm(h);
        }
        return { width, height };
    }

    const cropPotrait = (w, h) => {
        let width = 0;
        let height = 0;
        if (convertPxToMm(h) > 242) {
            width = Math.round((242 / convertPxToMm(h)) * convertPxToMm(w));
            height = 242;
        } else {
            width = convertPxToMm(w);
            height = convertPxToMm(h);
        }
        return { width, height };
    }

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
                    const ratio = item.width / item.height;
                    let img = {};
                    if (ratio > 1) {
                        img = cropLandscape(item.width, item.height);
                    } else {
                        img = cropPotrait(item.width, item.height);
                    }

                    const x = Math.round((210 - img.width) / 2);
                    const y = Math.round((297 - img.height) / 3);


                    doc.addImage(`${item.url}`, "PNG", x, y, img.width, img.height);

                    // const nm = item.name.split(".").slice(0, -1).join(".");
                    const textY = y + img.height + 10;
                    doc.text(`${item.name}`, 105, textY, null, null, "center");
                    doc.addPage();
                })
                doc.deletePage(imageDatas.length + 1);
                doc.save(new Date().toISOString() + "-pictures.pdf");
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


            <div className="w-full lg:w-1/2 p-4 mx-auto grid grid-cols-1 border-2 border-gray-400 shadow-lg rounded-lg">
                <form onSubmit={createPdfHandler}>
                    <div className="w-full grid grid-cols-1 gap-3 border p-4">
                        <input type="file" onChange={fileChangeHandlerImage} accept="image/*" multiple />
                    </div>
                    <BtnSubmit Title="Create PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />
                </form>
            </div>
        </>
    )

}

export default Imagestopdf;

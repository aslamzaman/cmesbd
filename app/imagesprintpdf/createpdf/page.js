"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { BtnEn } from "@/components/Form";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/navigation";
import Printpdf from "@/components/imagesprintpdf/printpdf";


const Createpdf = () => {
    const [imageDatas, setImageDatas] = useState([]);
    const [msg, setMsg] = useState("");
    const [qt, setQt] = useState("");
    const [activity, setActivity] = useState("");

    const componentRef = useRef(null);
    const router = useRouter();


    useEffect(() => {
        const data = localStorage.getItem('imagesprintpdf');
        if (data) {
            const { qt, activity } = JSON.parse(data);
            setQt(qt);
            setActivity(activity);
            setMsg(`Activity_${activity}_${qt}_CMES...`);
        } else {
            setQt("");
            setActivity("");
        }
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


    const realWidthHeight = (imgWidth, imgHeight) => {
        const ratio = parseInt(imgWidth) / parseInt(imgHeight);
        let w = 0;
        let h = 0;

        if (ratio > 1) {
            if (parseInt(imgWidth) > 750) {
                w = 750;
                h = (750 / parseInt(imgWidth)) * parseInt(imgHeight);
            } else {
                w = parseInt(imgWidth);
                h = parseInt(imgHeight);
            }
        } else {
            if (parseInt(imgHeight) > 530) {
                w = (530 / parseInt(imgHeight)) * parseInt(imgWidth);
                h = 530;
            } else {
                w = parseInt(imgWidth);
                h = parseInt(imgHeight);
            }
        }
        return { w, h };
    }


    const nameCreate = (nm) => {
        const unit = ['', 'SRJ', 'DEUTY', 'DAM', 'JAL', 'NDR', 'RNB', 'JNP'];
        const splitName = nm.split(".");
        const num = splitName[0].substring(0, 1);
        let s = "";
        if (splitName[0].length > 1) {
            s = `_${splitName[0].substring(1, splitName[0].length).trim()}`;
        } else {
            s = '';
        }
        const st = `Activity_${activity}_${qt}_CMES_${unit[parseInt(num)]}${s}.${splitName[1]}`;
        return st;
    }


    const fileChangeHandlerImage = async (e) => {
        try {
            const files = e.target.files;
            const imageDataPromises = Array.from(files).map(async (file) => {
                const imagBlobUrl = URL.createObjectURL(file);

                const { imgWidth, imgHeight } = await getImageWidthHeight(imagBlobUrl);

                const { w, h } = realWidthHeight(imgWidth, imgHeight);
                const nm = nameCreate(file.name);

                return {
                    url: imagBlobUrl,
                    width: imgWidth,
                    height: imgHeight,
                    w: w,
                    h: h,
                    nm: nm,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                };
            });

            const imageData = await Promise.all(imageDataPromises);
            console.log(imageData);
            setImageDatas(imageData);
            setMsg(`Activity_${activity}_${qt}_CMES...`);
        } catch (error) {
            console.error("Error processing images:", error);
        }
    };


    const pageStyle = `@media print {
        @page {
            size: A4 landscape;
            margin: .75in;
            @bottom-right {
                content: counter(page) " of " counter(pages);
            }
        }

        #flexbox{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        footer{
            page-break-after: always;
        }    
        #noPrint{
            display:none;
        }  
        #page{
            font-size: 10px;
            font-family: Arial, Helvetica, sans-serif;
        }
    }`;



    const printFn = useReactToPrint({
        contentRef: componentRef,
        pageStyle: pageStyle,
        documentTitle: `Activity_${activity}_${qt}_CMES`,
    });


    const printHandler = useCallback(() => {
        printFn();
    }, [printFn]);


    const pdfCreateHandler = () => {
        if (imageDatas.length < 1) {
            setMsg("Please select image files");
            return false;
        }
        printHandler();
        setMsg(`Activity_${activity}_${qt}_CMES...`);
    }



    const backHandler = () => {
        router.push("/imagesprintpdf");
    }



    return (
        <>
            <div className="bg-gray-100 py-4 mb-4">
                <h1 className="text-center text-2xl font-bold text-gray-500">Images to PDF</h1>
            </div>

            <div className="w-full lg:w-1/2 p-4 mx-auto mt-20 border-2 border-gray-400 shadow-lg rounded-lg">
                <div className="w-fulborder p-4">
                    <p className="text-center font-bold text-red-500">{msg}</p>
                    <div className="mt-4">
                        <input type="file" onChange={fileChangeHandlerImage} accept=".jpg, .jpeg, .png, .bmp" multiple />
                    </div>
                </div>
                <BtnEn Click={backHandler} Title="Back" Class="text-white bg-green-600 hover:bg-green-900" />
                <BtnEn Click={pdfCreateHandler} Title="Create PDF" Class="text-white bg-blue-600 hover:bg-blue-900" />
            </div>


            <div className="w-full h-auto p-16 overflow-auto">
                <div ref={componentRef} className="w-full h-full text-black">
                    {imageDatas.length ? (
                        imageDatas.map((data, i) => (
                            <div id="flexbox" key={i} className="w-full h-[610px]">
                                <div className="mx-auto" style={{ width: data.w, height: data.h }}>
                                    <Printpdf url={data.url} w={data.width} h={data.height} className="w-full h-auto" />
                                    <footer className="w-full text-center text-xl text-gray-600 font-bold mt-1">{data.nm}</footer>
                                </div>
                            </div>
                        ))
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Createpdf;

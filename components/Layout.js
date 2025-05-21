"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const MenuData = [
    {
        title: 'Accounts',
        group: [
            {
                label: 'BFTN',
                url: '/beftn'
            },

            {
                label: 'Bayprostab',
                url: '/bayprostab'
            },
            {
                label: 'Bayprostab Execution',
                url: '/bayprostabexecution'
            }
        ]
    },
    {
        title: 'Bills',
        group: [
            {
                label: 'Any Bill',
                url: '/anybill'
            },
            {
                label: 'Local TA',
                url: '/localta'
            },
            {
                label: 'Unit TA Bill',
                url: '/tabill'
            }
        ]
    },
    {
        title: 'Settings(Basic)',
        group: [
            {
                label: 'Author',
                url: '/author'
            },
            {
                label: 'Project',
                url: '/project'
            },
            {
                label: 'Price',
                url: '/price'
            }
        ]
    },
    {
        title: 'Setting(Accounts)',
        group: [
            {
                label: 'Receiver Bank',
                url: '/receiver'
            },
            {
                label: 'Sender Bank',
                url: '/sender'
            },
            {
                label: 'Staff',
                url: '/staff'
            },
            {
                label: 'TA Taka',
                url: '/dalist'
            },
            {
                label: 'DA Taka',
                url: '/talist'
            }
        ]
    },
    {
        title: 'Constructions',
        group: [
            {
                label: 'Brick Flat Solling',
                url: '/construction/bfs'
            },
            {
                label: 'Brick Works',
                url: '/construction/bw'
            },
            {
                label: 'CC Works',
                url: '/construction/cc'
            },
            {
                label: 'Plaster Works',
                url: '/construction/plaster'
            },
            {
                label: 'RCC Works',
                url: '/construction/rcc'
            },
        ]
    },
    {
        title: 'Generate',
        group: [

            {
                label: 'Bkash Send Money',
                url: '/bkashsend'
            },
            {
                label: 'VAT & TAX Calculator',
                url: '/vattax'
            },
            {
                label: 'Staff Benefit Calculator',
                url: '/benefit'
            },
            {
                label: 'COL Percipant Organize',
                url: '/colhelper'
            },
            {
                label: 'COL Certificate',
                url: '/certificate'
            },
            {
                label: 'Challan Verification',
                url: '/challancheck'
            }
        ]
    },
    {
        title: 'Converter',
        group: [
            {
                label: 'Land Area Converter',
                url: '/landareaconverter'
            },
            {
                label: 'Inword Converter',
                url: '/inwordconverter'
            },
            {
                label: 'Property Works',
                url: '/construction/property'
            },
            {
                label: 'Images to PDF',
                url: '/imagestopdf'
            }
        ]
    },
    {
        title: 'Formats/Application',
        group: [
            {
                label: 'CMES Formats',
                url: '/format'
            },
            {
                label: 'Leave Application',
                url: '/leave'
            },
            {
                label: 'Experience Certificate',
                url: '/experiencecertificate'
            },
             {
                label: 'CMES Logo',
                url: '/cmeslogo'
            },
        ]
    }
]




const Home = ({ children }) => {
    const [menu, setMenu] = useState(false);
    const [menuPos, setMenuPos] = useState("left-[-100vw]");


    const router = useRouter(null);
    const posFull = "left-0 right-0";
    const posLeft = "left-[-100vw]";



    useEffect(() => {
        window.addEventListener("resize", () => setMenu(false));
        return () => {
            window.removeEventListener("resize", () => setMenu(false));
        };

    }, [])



    const menuCloseHander = () => {
        if (menuPos === posFull) {
            setMenuPos(posLeft);
        } else {
            setMenuPos(posFull);
        }
    }



    const menuHideHandler = (e) => {
        if (e.target.id === 'leftMenu') {
            setMenuPos(posLeft);
        }
    }



    const manualClickHandler = () => {
        const pw = prompt("Enter password!");
        if (pw !== 'aslam') return false;
        router.push("/cmesmanual");
    }




    return (
        <>
            <div id="header" className="fixed h-[60px] left-0 top-0 right-0 px-4 lg:p-6 flex items-center justify-between bg-white border-b-2 border-gray-300 drop-shadow-lg z-50">
                <div className='flex items-center justify-center space-x-3 lg:space-x-0'>
                    <div className='block lg:hidden'>
                        <MenuBar click={menuCloseHander} />
                    </div>
                    <Link href="/" className='flex items-center justify-start space-x-2'>
                        <Image src='/images/logo/logo.png' alt='Logo' width={256} height={256} className='w-7 lg:w-8 h-auto' />
                        <h1 className='text-start text-base lg:text-xl text-blue-600 font-bold uppercase scale-y-150'>cmesbd</h1>
                    </Link>
                </div>
                <div className='flex items-center justify-end space-x-4'>
                    <Link href='/about' className='hover:underline underline-offset-2 decoration-2'>About</Link>
                    <Link href='/contact' className='hover:underline underline-offset-2 decoration-2'>Contact</Link>
                </div>
            </div>



            <div id="leftMenu" onClick={menuHideHandler} className={`fixed ${menuPos} top-[60px] bottom-0 transition-all duration-500 z-40`}>
                <div className='w-[250px] h-[calc(100vh-60px)] pb-[100px] flex flex-col text-sm md:text-base bg-gray-100 border-r-2 border-gray-200 drop-shadow-xl overflow-auto'>
                    <LeftMenu />
                    <button onClick={manualClickHandler} className='w-full text-start pl-8 hover:bg-gray-300 transition-all duration-500'>CMES Manual</button>
                </div>
            </div>



            <div id="container" className='fixed left-0 top-[60px] right-0 bottom-0 flex'>
                <div id="leftBar" className="hidden lg:block w-[300px] h-[calc(100vh-60px)] pb-[100px] flex flex-col bg-gray-100 border-r-2 border-gray-200 drop-shadow-xl overflow-auto">
                    <LeftMenu />
                    <button onClick={manualClickHandler} className='w-full text-start pl-8 hover:bg-gray-300 transition-all duration-500'>CMES Manual</button>
                </div>



                <div className='w-full h-[calc(100vh-60px)] px-4 pt-4 pb-[100px] bg-white overflow-auto'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Home





const LeftMenu = () => {
    return (
        <>
            {MenuData ? MenuData.map((data, i) => {
                const menuTitle = data.title;
                const menus = data.group;
                return (
                    <div className='flex flex-col' key={i}>
                        <label className='pl-4 pt-4 pb-0.5 text-xl text-gray-400 font-semibold border-b-2 border-gray-200'>{menuTitle}</label>
                        {menus ? menus.map((item, index) => <Link href={item.url} className='pl-8 hover:bg-gray-300 transition-all duration-500' key={index}>{item.label}</Link>) : null}
                    </div>
                )
            }) : null}

        </>
    )

}




const MenuBar = ({ click }) => {
    return <button onClick={click} className='w-7 h-7 flex item-center'><svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox='0 0 30 30'>
        <path d="M2 8 L28 8 M2 15 L28 15 M2 22 L28 22"
            className="fill-none stroke-gray-500" style={{ strokeWidth: '4px' }} />
    </svg></button>
}

"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDataFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";


const setting = {
    author: [
        {
            "id": "1733758962403",
            "name": "Dr.Muhammad Ibrahim",
            "post": "Chairman"
        },
        {
            "id": "1733758969883",
            "name": "Apurba Roy",
            "post": "Deputy Project Coordinator"
        },
        {
            "id": "1733758977618",
            "name": "Md. Omar Faruque Haider",
            "post": "Executive Director"
        }
    ],
    price: [
        {
            "id": "2ihLY7ZNyJgYKT3fO03v",
            "name": "Rod",
            "taka": "140"
        },
        {
            "id": "4wIhMnVTz4T63tuiNl5o",
            "name": "Tiles",
            "taka": "80"
        },
        {
            "id": "7sr2LdUOcYRCuWzeDvaF",
            "name": "Labor",
            "taka": "400"
        },
        {
            "id": "AXc2dF5VYHRVc0KtW5i7",
            "name": "Brick",
            "taka": "12"
        },
        {
            "id": "BPdiFFWadoXdzVhBg9tj",
            "name": "Flatbar",
            "taka": "120"
        },
        {
            "id": "PoYjiI0qdpXEPpHSvbmx",
            "name": "Khoa",
            "taka": "80"
        },
        {
            "id": "SFlvASnMa3RjbPgzz0Tw",
            "name": "Sand",
            "taka": "20"
        },
        {
            "id": "SXTILtVdWvOfdubnzuKn",
            "name": "Mason",
            "taka": "600"
        },
        {
            "id": "aj4THFRGdOZjs0QNPlrF",
            "name": "Cement",
            "taka": "550"
        },
        {
            "id": "mtgAaRyWBPxCOLjBXHn4",
            "name": "Angel Bar",
            "taka": "125"
        },
        {
            "id": "s62d8HMIXkC2Wh2CtNVd",
            "name": "Paint",
            "taka": "1500"
        }
    ],
    project: [
        {
            "id": "1733759017410",
            "name": "3rd AC"
        },
        {
            "id": "1733759026418",
            "name": "3rd AC Field"
        },
        {
            "id": "1733759035922",
            "name": "CateringField"
        },
        {
            "id": "1733759044330",
            "name": "COL"
        },
        {
            "id": "1733759053170",
            "name": "CORE"
        },
        {
            "id": "1733759062450",
            "name": "EDM"
        },
        {
            "id": "1733759071586",
            "name": "GO"
        },
        {
            "id": "1733759081058",
            "name": "IDCOL"
        },
        {
            "id": "1733759089977",
            "name": "MC"
        },
        {
            "id": "1733759097721",
            "name": "PLAN"
        },
        {
            "id": "1733759107553",
            "name": "SDC & SIDA"
        },
        {
            "id": "1733759117345",
            "name": "Trade AC"
        },
        {
            "id": "1733759125297",
            "name": "TrustFund"
        },
        {
            "id": "1733759133785",
            "name": "Unicef"
        },
        {
            "id": "1733759143105",
            "name": "YSES"
        }
    ],
    staff: [
        {
            "id": "1733759251576",
            "nameEn": "Md. Omar Faruque Haider",
            "nameBn": "†gv: Igi dviæK nvq`vi",
            "gender": "Male",
            "postEn": "Executive Director",
            "postBn": "wbe©vnx cwiPvjK",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759260288",
            "nameEn": "Apurba Roy",
            "nameBn": "Ac~e© ivq",
            "gender": "Male",
            "postEn": "Deputy Project Coordinator",
            "postBn": "†WcywU cÖ‡R± †Kv-AwW©‡bUi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759268600",
            "nameEn": "Sk. Shamsuzzaman",
            "nameBn": "†kL mvgQy¾vgvb",
            "gender": "Male",
            "postEn": "Senior Program Manager",
            "postBn": "wmwbqi †cÖvMÖvg g¨v‡bRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759278392",
            "nameEn": "Md. Mofigul Huq",
            "nameBn": "†gvt gwdRyj nK",
            "gender": "Male",
            "postEn": "Program Manager",
            "postBn": "†cÖvMÖvg g¨v‡bRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759288576",
            "nameEn": "Aslam Zaman",
            "nameBn": "Avmjvg Rvgvb",
            "gender": "Male",
            "postEn": "Senior Program Organizer",
            "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "01720025151"
        },
        {
            "id": "1733759300600",
            "nameEn": "Md. Zohurul Haque",
            "nameBn": "†gvt Rûiæj nK",
            "gender": "Male",
            "postEn": "Senior Program Organizer",
            "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759311904",
            "nameEn": "Md. Abul Kashem",
            "nameBn": "†gv: Aveyj Kv‡mg",
            "gender": "Male",
            "postEn": "Senior Program Organizer",
            "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759321567",
            "nameEn": "Gita Mitra",
            "nameBn": "MxZv wgÎ",
            "gender": "Female",
            "postEn": "Senior Program Organizer",
            "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759332543",
            "nameEn": "Dewan Emrul Kayes",
            "nameBn": "†`Iqvb Bgiæj Kv‡qm",
            "gender": "Male",
            "postEn": "Senior Program Organizer",
            "postBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759342943",
            "nameEn": "Amit Kumare Mohury",
            "nameBn": "AwgZ Kzgvi gûix",
            "gender": "Male",
            "postEn": "Program Organizer",
            "postBn": "†cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759352087",
            "nameEn": "Zakia Akter",
            "nameBn": "RvwKqv Av³vi",
            "gender": "Female",
            "postEn": "Program Organizer",
            "postBn": "†cÖvMÖvg AM©vbvBRvi",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759362399",
            "nameEn": "Md. Abdur Rahman",
            "nameBn": "†gv: Avãyi ingvb",
            "gender": "Male",
            "postEn": "Program Organizer(Inc)",
            "postBn": "wcI (BbPvR©)",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759376087",
            "nameEn": "Mohammad Rejaul Karim",
            "nameBn": "†gvnv¤§` †iRvDj Kwig",
            "gender": "Male",
            "postEn": "Program Organizer(Inc)",
            "postBn": "wcI (BbPvR©)",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759385479",
            "nameEn": "Al-Amin Hossain",
            "nameBn": "Avj Avwgb †nv‡mb",
            "gender": "Male",
            "postEn": "Program Assistant",
            "postBn": "†cÖvMÖvg G¨vwm÷¨v›U",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759393831",
            "nameEn": "Md. Tuhin Akter",
            "nameBn": "†gv: Zzwnb Av³vi",
            "gender": "Male",
            "postEn": "Program Assistant",
            "postBn": "†cÖvMÖvg G¨vwm÷¨v›U",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759401215",
            "nameEn": "Md. Liton Patuary",
            "nameBn": "†gvt wjUb cv‡Uvqvix",
            "gender": "Male",
            "postEn": "General Assistant",
            "postBn": "mvavib mnKvix",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759411647",
            "nameEn": "Md. Jasim Uddin",
            "nameBn": "†gv: Rwmg DwÏb",
            "gender": "Male",
            "postEn": "General Assistant",
            "postBn": "mvavib mnKvix",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759422559",
            "nameEn": "Md. Abul Bashar",
            "nameBn": "†gv: Aveyj evkvi",
            "gender": "Male",
            "postEn": "DRIVER",
            "postBn": "Mvox PvjK",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759431295",
            "nameEn": "Md. Jamal Uddin",
            "nameBn": "†gv: Rvgvj DwÏb",
            "gender": "Male",
            "postEn": "DRIVER",
            "postBn": "Mvox PvjK",
            "address": "Address",
            "mobile": "123456789"
        },
        {
            "id": "1733759441695",
            "nameEn": "Ms. Marzina Khatun",
            "nameBn": "†gvQv: gwR©bv LvZzb",
            "gender": "Female",
            "postEn": "CLEANER",
            "postBn": "cwi”QbœZv Kg©x",
            "address": "Address",
            "mobile": "123456789"
        }
    ],
    ta: [
        {
            "id": 1741967515163,
            "unit": "Alinagar",
            "tk": 1240
        },
        {
            "id": 1741967515269,
            "unit": "Amtoli",
            "tk": 1080
        },
        {
            "id": 1741967515386,
            "unit": "Amua",
            "tk": 1030
        },
        {
            "id": 1741967515490,
            "unit": "Bakshiganj",
            "tk": 910
        },
        {
            "id": 1741967515598,
            "unit": "Damkura",
            "tk": 1060
        },
        {
            "id": 1741967515707,
            "unit": "Deuty",
            "tk": 1150
        },
        {
            "id": 1741967515816,
            "unit": "Elaipur",
            "tk": 1250
        },
        {
            "id": 1741967515927,
            "unit": "Fulbari",
            "tk": 1360
        },
        {
            "id": 1741967516035,
            "unit": "Ghontaghar",
            "tk": 1200
        },
        {
            "id": 1741967516144,
            "unit": "Gobratola",
            "tk": 1160
        },
        {
            "id": 1741967516252,
            "unit": "Haluaghat",
            "tk": 800
        },
        {
            "id": 1741967516360,
            "unit": "Jaldhaka",
            "tk": 1280
        },
        {
            "id": 1741967516468,
            "unit": "Jointiapur",
            "tk": 1100
        },
        {
            "id": 1741967516577,
            "unit": "Kayetpara",
            "tk": 450
        },
        {
            "id": 1741967516686,
            "unit": "Khaserhat",
            "tk": 1100
        },
        {
            "id": 1741967516794,
            "unit": "Kuripara",
            "tk": 700
        },
        {
            "id": 1741967516902,
            "unit": "Malgara",
            "tk": 1300
        },
        {
            "id": 1741967517011,
            "unit": "Nalitabari",
            "tk": 850
        },
        {
            "id": 1741967517119,
            "unit": "Noyadiary",
            "tk": 1210
        },
        {
            "id": 1741967517227,
            "unit": "Patharghata",
            "tk": 1150
        },
        {
            "id": 1741967517335,
            "unit": "Rajabari",
            "tk": 470
        },
        {
            "id": 1741967517445,
            "unit": "Ranirbandar",
            "tk": 1170
        },
        {
            "id": 1741967517552,
            "unit": "Satbaria",
            "tk": 1500
        },
        {
            "id": 1741967517661,
            "unit": "Shokhipur",
            "tk": 600
        },
        {
            "id": 1741967517770,
            "unit": "Suruj",
            "tk": 600
        },
        {
            "id": 1741967517881,
            "unit": "Ulipur",
            "tk": 1260
        },
        {
            "id": 1741967517994,
            "unit": "Vatpara",
            "tk": 1010
        }
    ],
    da: [
        {
            "id": 1741967635719,
            "post": "Agro based T.& Facilitator",
            "tk": "380"
        },
        {
            "id": 1741967635821,
            "post": "Assistant Credit Manager",
            "tk": "380"
        },
        {
            "id": 1741967635934,
            "post": "Caretaker Cum Night Guard",
            "tk": "380"
        },
        {
            "id": 1741967636042,
            "post": "Chairman",
            "tk": "0"
        },
        {
            "id": 1741967636153,
            "post": "CLEANER",
            "tk": "380"
        },
        {
            "id": 1741967636259,
            "post": "Computer Trainer",
            "tk": "380"
        },
        {
            "id": 1741967636366,
            "post": "Credit Manager",
            "tk": "430"
        },
        {
            "id": 1741967636476,
            "post": "Deputy Project Coordinator",
            "tk": "600"
        },
        {
            "id": 1741967636589,
            "post": "DRIVER",
            "tk": "380"
        },
        {
            "id": 1741967636696,
            "post": "Executive Director",
            "tk": "0"
        },
        {
            "id": 1741967636804,
            "post": "Garments Trainer",
            "tk": "380"
        },
        {
            "id": 1741967636914,
            "post": "General Assistant",
            "tk": "380"
        },
        {
            "id": 1741967637023,
            "post": "Loan Worker",
            "tk": "380"
        },
        {
            "id": 1741967637133,
            "post": "Program Assistant",
            "tk": "380"
        },
        {
            "id": 1741967637242,
            "post": "Program Manager",
            "tk": "500"
        },
        {
            "id": 1741967637353,
            "post": "Program Organizer",
            "tk": "430"
        },
        {
            "id": 1741967637464,
            "post": "Program Organizer(Inc)",
            "tk": "430"
        },
        {
            "id": 1741967637567,
            "post": "Senior Program Assistant",
            "tk": "380"
        },
        {
            "id": 1741967637675,
            "post": "Senior Program Manager",
            "tk": "500"
        },
        {
            "id": 1741967637784,
            "post": "Senior Program Organizer",
            "tk": "430"
        },
        {
            "id": 1741967637893,
            "post": "Unit Incharge",
            "tk": "380"
        }
    ]
}







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
        title: 'Settings',
        group: [
            {
                label: 'Staff',
                url: '/staff'
            },
            {
                label: 'Author',
                url: '/author'
            },

            {
                label: 'Project',
                url: '/project'
            },
            {
                label: 'TA Taka',
                url: '/talist'
            },
            {
                label: 'DA Taka',
                url: '/dalist'
            },
            {
                label: 'Sender Bank',
                url: '/sender'
            },
            {
                label: 'Receiver Bank',
                url: '/receiver'
            },
            {
                label: 'Construction Items Rate',
                url: '/price'
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
                label: 'Merge images',
                url: '/mergeimages'
            },
            {
                label: 'COL Certificate',
                url: '/certificate'
            },
            {
                label: 'COL Merge PDF',
                url: '/imagestopdf'
            },

            {
                label: 'CMES Logo Download',
                url: '/cmeslogo'
            },
            {
                label: 'COL Participant Organize',
                url: '/colhelper'
            },
            {
                label: 'Bkash Send Money',
                url: '/bkashsend'
            },
            {
                label: 'Challan Verification',
                url: '/challancheck'
            },
            {
                label: 'VAT & TAX Calculator',
                url: '/vattax'
            },
            {
                label: 'Staff Benefit Calculator',
                url: '/benefit'
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
        ]
    }
]




const Home = ({ children }) => {
    const [menuPos, setMenuPos] = useState("left-[-100vw]");

    
    const router = useRouter(null);
    const posFull = "left-0 right-0";
    const posLeft = "left-[-100vw]";



    useEffect(() => {
        window.addEventListener("resize", () => setMenuPos(posLeft));
        return () => {
            window.removeEventListener("resize", () => setMenuPos(posLeft));
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

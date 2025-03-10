"use client";

import { sortArray } from "@/lib/utils";

const data = [
    {
        "id": "Ui05MjFSUtELOTepX0tt",
        "postId": "2sjNnWAwER4m73UQAWzv",
        "tk": "380",
        "createdAt": "2024-04-03T06:25:27.955Z",
        "post": {
            "id": "2sjNnWAwER4m73UQAWzv",
            "nmBn": "GM‡iv †emW d¨vwmwj‡UUi",
            "createdAt": "2024-04-01T06:46:54.013Z",
            "nmEn": "Agro based T.& Facilitator",
            "nmUn": "এগরো বেসড ফ্যাসিলিটেটর"
        },
        "postName": "Agro based T.& Facilitator"
    },
    {
        "id": "yKzjqrLAvoAPZJtvrOxy",
        "postId": "8fp0HyAJMRaztTTiBmEb",
        "createdAt": "2024-04-03T06:24:47.613Z",
        "tk": "380",
        "post": {
            "id": "8fp0HyAJMRaztTTiBmEb",
            "nmBn": "Gwm÷¨v›U †µwWU g¨v‡bRvi",
            "createdAt": "2024-04-01T06:48:22.577Z",
            "nmUn": "এসিস্ট্যান্ট ক্রেডিট ম্যানেজার",
            "nmEn": "Assistant Credit Manager"
        },
        "postName": "Assistant Credit Manager"
    },
    {
        "id": "2VHdu9rQdpRzhKOOuNOa",
        "tk": "380",
        "postId": "ly3UAyJBdftsmnnM4oCu",
        "createdAt": "2024-04-03T06:24:32.166Z",
        "post": {
            "id": "ly3UAyJBdftsmnnM4oCu",
            "nmBn": "wmwUGbwR",
            "nmEn": "Caretaker Cum Night Guard",
            "nmUn": "সিটিএনজি ",
            "createdAt": "2024-04-01T06:48:39.800Z"
        },
        "postName": "Caretaker Cum Night Guard"
    },
    {
        "id": "gHqfHr2lq45xUWnHQBGe",
        "postId": "Dz41YIRDWBhH2Mr83oMB",
        "createdAt": "2024-04-03T06:25:46.503Z",
        "tk": "0",
        "post": {
            "id": "Dz41YIRDWBhH2Mr83oMB",
            "nmBn": "†Pqvig¨vb",
            "createdAt": "2024-04-01T08:17:09.507Z",
            "nmUn": "চেয়ারম্যান",
            "nmEn": "Chairman"
        },
        "postName": "Chairman"
    },
    {
        "id": "F6PLQ9zMaSfxCUFTJ9z1",
        "tk": "380",
        "postId": "sOsxSgl665s5bzb7y912",
        "createdAt": "2024-04-03T06:23:34.399Z",
        "post": {
            "id": "sOsxSgl665s5bzb7y912",
            "createdAt": "2024-04-01T06:49:24.679Z",
            "nmUn": "পরিচ্ছন্নতা কর্মী",
            "nmEn": "CLEANER",
            "nmBn": "cwi”QbœZv Kg©x"
        },
        "postName": "CLEANER"
    },
    {
        "id": "OYOh2B4SayuyrMUYFc2q",
        "tk": "380",
        "createdAt": "2024-04-03T06:25:00.499Z",
        "postId": "CNG2ZNwNxcI2OvFM5WFu",
        "post": {
            "id": "CNG2ZNwNxcI2OvFM5WFu",
            "nmEn": "Computer Trainer",
            "nmBn": "Kw¤úDUvi †UÖBbvi",
            "createdAt": "2024-04-01T06:48:04.651Z",
            "nmUn": "কম্পিউটার ট্রেইনার"
        },
        "postName": "Computer Trainer"
    },
    {
        "id": "msszGLhm9rwG3JHzV3Ph",
        "tk": "430",
        "postId": "Ni1AeYdcaJ4vMwfHQKgQ",
        "createdAt": "2024-04-03T06:24:17.025Z",
        "post": {
            "id": "Ni1AeYdcaJ4vMwfHQKgQ",
            "nmUn": "ক্রেডিট ম্যানেজার",
            "nmEn": "Credit Manager",
            "createdAt": "2024-04-01T06:48:56.832Z",
            "nmBn": "†µwWU g¨v‡bRvi"
        },
        "postName": "Credit Manager"
    },
    {
        "id": "HUwW9pHnjMRKDPa1P61Q",
        "postId": "OEHixJdCHjJNNosx5ixH",
        "createdAt": "2024-04-03T06:20:06.188Z",
        "tk": "600",
        "post": {
            "id": "OEHixJdCHjJNNosx5ixH",
            "nmUn": "ডেপুটি প্রজেক্ট কো-অর্ডিনেটর",
            "nmBn": "†WcywU cÖ‡R± †Kv-AwW©‡bUi",
            "nmEn": "Deputy Project Coordinator",
            "createdAt": "2024-04-01T06:52:04.160Z"
        },
        "postName": "Deputy Project Coordinator"
    },
    {
        "id": "A8iG7hO7Y4ruhEGPJcH8",
        "postId": "GueJ9ylUZNa9ZAfTUNSi",
        "tk": "380",
        "createdAt": "2024-04-03T06:23:23.330Z",
        "post": {
            "id": "GueJ9ylUZNa9ZAfTUNSi",
            "nmBn": "Mvox PvjK",
            "nmUn": "গাড়ী চালক",
            "createdAt": "2024-04-01T06:49:41.319Z",
            "nmEn": "DRIVER"
        },
        "postName": "DRIVER"
    },
    {
        "id": "iHSVjVrWSmSzhmlILBlq",
        "createdAt": "2024-04-03T06:27:40.949Z",
        "tk": "0",
        "postId": "BriSN20xS1vkzXA7z8NW",
        "post": {
            "id": "BriSN20xS1vkzXA7z8NW",
            "createdAt": "2024-04-01T06:52:19.730Z",
            "nmEn": "Executive Director",
            "nmUn": "নির্বাহী পরিচালক",
            "nmBn": "wbe©vnx cwiPvjK"
        },
        "postName": "Executive Director"
    },
    {
        "id": "blGsNBi99Mz92Q6wTesd",
        "postId": "iftHNmIgzmI600PMSi6x",
        "createdAt": "2024-04-03T06:25:16.141Z",
        "tk": "380",
        "post": {
            "id": "iftHNmIgzmI600PMSi6x",
            "nmBn": "Mv‡g©›Um †UÖBbvi",
            "nmEn": "Garments Trainer",
            "nmUn": "গার্মেন্টস ট্রেইনার",
            "createdAt": "2024-04-01T06:47:47.757Z"
        },
        "postName": "Garments Trainer"
    },
    {
        "id": "G1tkx3Ov4JzJgH7UxESC",
        "postId": "weT83Cc2U9Op1V39cQx0",
        "tk": "380",
        "createdAt": "2024-04-03T06:23:08.305Z",
        "post": {
            "id": "weT83Cc2U9Op1V39cQx0",
            "nmEn": "General Assistant",
            "nmBn": "mvavib mnKvix",
            "nmUn": "সাধারন সহকারী",
            "createdAt": "2024-04-01T06:49:55.854Z"
        },
        "postName": "General Assistant"
    },
    {
        "id": "YIQ0brr4JOP5rBGPSFV6",
        "createdAt": "2024-04-03T06:23:57.447Z",
        "tk": "380",
        "postId": "dsafI41PUrelQ86WMNlJ",
        "post": {
            "id": "dsafI41PUrelQ86WMNlJ",
            "createdAt": "2024-04-01T06:49:10.002Z",
            "nmUn": "লোন ওয়ার্কার",
            "nmEn": "Loan Worker",
            "nmBn": "†jvb IqvK©vi"
        },
        "postName": "Loan Worker"
    },
    {
        "id": "w8Za1IMYzRpdyUemKoA5",
        "tk": "380",
        "createdAt": "2024-04-03T06:22:54.859Z",
        "postId": "drQILBe34YHtRD3GJeuV",
        "post": {
            "id": "drQILBe34YHtRD3GJeuV",
            "createdAt": "2024-04-01T06:50:13.921Z",
            "nmUn": "প্রোগ্রাম এ্যাসিস্ট্যান্ট",
            "nmEn": "Program Assistant",
            "nmBn": "†cÖvMÖvg G¨vwm÷¨v›U"
        },
        "postName": "Program Assistant"
    },
    {
        "id": "qxIQcMxnYJhLz9qx1baR",
        "tk": "500",
        "createdAt": "2024-04-03T06:20:54.479Z",
        "postId": "VGpkAMKs19LnxyOGl9oO",
        "post": {
            "id": "VGpkAMKs19LnxyOGl9oO",
            "nmBn": "†cÖvMÖvg g¨v‡bRvi",
            "nmEn": "Program Manager",
            "nmUn": "প্রোগ্রাম ম্যানেজার",
            "createdAt": "2024-04-01T06:51:32.408Z"
        },
        "postName": "Program Manager"
    },
    {
        "id": "0AOGSLRIduZ5mnzDtpDz",
        "postId": "tKSVPXvc9O5ktHPaJRCJ",
        "tk": "430",
        "createdAt": "2024-04-03T06:21:29.872Z",
        "post": {
            "id": "tKSVPXvc9O5ktHPaJRCJ",
            "nmEn": "Program Organizer",
            "nmBn": "†cÖvMÖvg AM©vbvBRvi",
            "nmUn": "প্রোগ্রাম অর্গানাইজার",
            "createdAt": "2024-04-01T06:51:00.673Z"
        },
        "postName": "Program Organizer"
    },
    {
        "id": "nv6OE7coiVyH4QOvkbwe",
        "createdAt": "2024-04-03T06:21:37.573Z",
        "tk": "430",
        "postId": "JBsNpKfAZCp0DLjyxnWl",
        "post": {
            "id": "JBsNpKfAZCp0DLjyxnWl",
            "createdAt": "2024-04-01T06:50:45.424Z",
            "nmUn": "পিও (ইনচার্জ)",
            "nmEn": "Program Organizer(Inc)",
            "nmBn": "wcI (BbPvR©)"
        },
        "postName": "Program Organizer(Inc)"
    },
    {
        "id": "8fUhN6Se4K0Few092xsd",
        "tk": "380",
        "postId": "AvZyJRS9uy9dvRzWUO3q",
        "createdAt": "2024-04-03T06:21:54.318Z",
        "post": {
            "id": "AvZyJRS9uy9dvRzWUO3q",
            "nmBn": "wmwbqi †cÖvMÖvg G¨vwm÷¨v›U",
            "nmUn": "সিনিয়র প্রোগ্রাম এ্যাসিস্ট্যান্ট",
            "createdAt": "2024-04-01T06:50:29.402Z",
            "nmEn": "Senior Program Assistant"
        },
        "postName": "Senior Program Assistant"
    },
    {
        "id": "yOru8xYQ4YqNenSmrU66",
        "postId": "pAMxtReuSByXHyIL2OG8",
        "tk": "500",
        "createdAt": "2024-04-03T06:20:45.223Z",
        "post": {
            "id": "pAMxtReuSByXHyIL2OG8",
            "nmEn": "Senior Program Manager",
            "nmBn": "wmwbqi †cÖvMÖvg g¨v‡bRvi",
            "createdAt": "2024-04-01T06:51:48.298Z",
            "nmUn": "সিনিয়র প্রোগ্রাম ম্যানেজার"
        },
        "postName": "Senior Program Manager"
    },
    {
        "id": "0yNUQdGvr7vfgHKmSzhk",
        "postId": "8UeQQecAOzmpRlPuUSXI",
        "tk": "430",
        "createdAt": "2024-04-03T06:21:10.975Z",
        "post": {
            "id": "8UeQQecAOzmpRlPuUSXI",
            "createdAt": "2024-04-01T06:51:15.962Z",
            "nmEn": "Senior Program Organizer",
            "nmBn": "wmwbqi †cÖvMÖvg AM©vbvBRvi",
            "nmUn": "সিনিয়র প্রোগ্রাম অর্গানাইজার"
        },
        "postName": "Senior Program Organizer"
    },
    {
        "id": "D5BoF4Y2KtbOMHJmmJsN",
        "postId": "p8Un1oZVsuQSlJ48Pk2l",
        "createdAt": "2024-04-03T06:25:36.522Z",
        "tk": "380",
        "post": {
            "id": "p8Un1oZVsuQSlJ48Pk2l",
            "createdAt": "2024-04-01T06:46:16.043Z",
            "nmEn": "Unit Incharge",
            "nmUn": "ইউনিট ইনচার্জ",
            "nmBn": "BDwbU BbPvR©"
        },
        "postName": "Unit Incharge"
    }
]

const list = data.sort((a,b)=>sortArray(a.post.nmEn.toUpperCase(),b.post.nmEn.toUpperCase()));

const Dalist = () => {

    return (
        <>
            <div className="w-full lg:w-3/4 mx-auto">
                  
                <h1 className="w-full py-10 text-center text-3xl font-bold text-gray-500">DA Taka</h1>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="text-center">SL</th>
                            <th className="text-start pl-4">Post</th>
                            <th className="text-end pr-4">Taka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((da, i) => (
                            <tr className="border-b border-gray-300" key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-start pl-4">{da.post.nmEn}</td>
                                <td className="text-end pr-4">{da.tk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Dalist;


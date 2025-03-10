"use client";

import { sortArray } from "@/lib/utils";

const data = [
    {
        "id": "iuhyB6BjVSIf2Jdkbogp",
        "createdAt": "2024-04-03T05:36:16.914Z",
        "unitId": "bhpsAQFkNZkRSPf4Z2Hx",
        "tk": 1240,
        "unit": {
            "id": "bhpsAQFkNZkRSPf4Z2Hx",
            "nmEn": "Alinagar",
            "createdAt": "2024-04-01T16:23:47.336Z",
            "nmUn": "আলীনগর",
            "nmBn": "AvjxbMi"
        },
        "unitName": "Alinagar"
    },
    {
        "id": "emuYp6ybkx0y8YtGVBTn",
        "unitId": "3y7WBpakgd3JiXiWE4O9",
        "createdAt": "2024-04-03T05:38:46.145Z",
        "tk": 1080,
        "unit": {
            "id": "3y7WBpakgd3JiXiWE4O9",
            "nmEn": "Amtoli",
            "nmUn": "আমতলী",
            "nmBn": "AvgZjx",
            "createdAt": "2024-04-01T16:19:48.641Z"
        },
        "unitName": "Amtoli"
    },
    {
        "id": "GBnd14jAUnlmAd3Bqqlc",
        "createdAt": "2024-04-03T05:38:27.573Z",
        "tk": 1030,
        "unitId": "GpiGfIZcX4fRxPYUmja2",
        "unit": {
            "id": "GpiGfIZcX4fRxPYUmja2",
            "createdAt": "2024-04-01T16:24:51.858Z",
            "nmUn": "আমুয়া",
            "nmBn": "Avgyqv",
            "nmEn": "Amua"
        },
        "unitName": "Amua"
    },
    {
        "id": "pVFIBuni66lQh0Xg41tF",
        "unitId": "VC64fpFW4zBLm0qerljL",
        "tk": 910,
        "createdAt": "2024-04-03T05:39:35.974Z",
        "unit": {
            "id": "VC64fpFW4zBLm0qerljL",
            "createdAt": "2024-04-01T16:20:29.257Z",
            "nmUn": "বকশীগঞ্জ",
            "nmEn": "Bakshiganj",
            "nmBn": "eKkxMÄ"
        },
        "unitName": "Bakshiganj"
    },
    {
        "id": "747SVhHBsdtOp13rwTQA",
        "createdAt": "2024-04-03T05:35:23.639Z",
        "unitId": "uF0phWozvGaNCVWwPxTP",
        "tk": 1060,
        "unit": {
            "id": "uF0phWozvGaNCVWwPxTP",
            "createdAt": "2024-04-01T16:24:38.392Z",
            "nmBn": "`vgKzov",
            "nmEn": "Damkura",
            "nmUn": "দামকুড়া"
        },
        "unitName": "Damkura"
    },
    {
        "id": "WQ17FXYex7eJfkgfZFie",
        "createdAt": "2024-04-03T05:33:53.132Z",
        "tk": 1150,
        "unitId": "VeUQ4OZHuzuQrizlwxjK",
        "unit": {
            "id": "VeUQ4OZHuzuQrizlwxjK",
            "createdAt": "2024-04-01T16:20:15.005Z",
            "nmUn": "দেউতি",
            "nmEn": "Deuty",
            "nmBn": "†`DwZ"
        },
        "unitName": "Deuty"
    },
    {
        "id": "VpE94wjGQpUtCQGXT8ml",
        "tk": 1250,
        "unitId": "eMctdLxtTbTjyPdfwfUL",
        "createdAt": "2024-04-03T05:36:44.613Z",
        "unit": {
            "id": "eMctdLxtTbTjyPdfwfUL",
            "nmBn": "GjvBcyi ",
            "createdAt": "2024-04-01T16:22:28.361Z",
            "nmUn": "এলাইপুর ",
            "nmEn": "Elaipur"
        },
        "unitName": "Elaipur"
    },
    {
        "id": "h21dR5w9QldR3TJdoFLD",
        "createdAt": "2024-04-03T05:39:10.694Z",
        "tk": 1360,
        "unitId": "tygf2i7S5x6BQZ2q6e1f",
        "unit": {
            "id": "tygf2i7S5x6BQZ2q6e1f",
            "createdAt": "2024-04-01T16:22:15.944Z",
            "nmEn": "Fulbari",
            "nmBn": "dzjevwo",
            "nmUn": "ফুলবাড়ি"
        },
        "unitName": "Fulbari"
    },
    {
        "id": "XLgU9wH3dEIJR7VbIfCV",
        "unitId": "IavF6u6NqU8YUrq2qiL9",
        "createdAt": "2024-04-03T05:37:28.509Z",
        "tk": 1200,
        "unit": {
            "id": "IavF6u6NqU8YUrq2qiL9",
            "nmBn": "N›UvNi",
            "createdAt": "2024-04-01T16:25:04.250Z",
            "nmUn": "ঘন্টাঘর",
            "nmEn": "Ghontaghar"
        },
        "unitName": "Ghontaghar"
    },
    {
        "id": "QLINvCo16aoFOcC8lfbn",
        "tk": 1160,
        "unitId": "YyqKjAzqDAqEfgTp5VJS",
        "createdAt": "2024-04-03T05:35:36.778Z",
        "unit": {
            "id": "YyqKjAzqDAqEfgTp5VJS",
            "nmEn": "Gobratola",
            "nmUn": "গোবরাতলা",
            "nmBn": "†MveivZjv",
            "createdAt": "2024-04-01T16:22:55.113Z"
        },
        "unitName": "Gobratola"
    },
    {
        "id": "docDJ03GaBnKQlvfNo71",
        "tk": 800,
        "unitId": "N0zXQGx1KcDLhNk3eaPk",
        "createdAt": "2024-04-03T05:39:59.766Z",
        "unit": {
            "id": "N0zXQGx1KcDLhNk3eaPk",
            "nmBn": "nvjyqvNvU",
            "createdAt": "2024-04-01T16:20:02.921Z",
            "nmUn": "হালুয়াঘাট",
            "nmEn": "Haluaghat"
        },
        "unitName": "Haluaghat"
    },
    {
        "id": "5LnJx7okkwHF1csP5lRr",
        "tk": 1280,
        "unitId": "7WEY1xyiuiRXPrXhZAnL",
        "createdAt": "2024-04-03T05:37:43.227Z",
        "unit": {
            "id": "7WEY1xyiuiRXPrXhZAnL",
            "nmUn": "জলঢাকা",
            "nmBn": "RjXvKv",
            "createdAt": "2024-04-01T16:22:42.702Z",
            "nmEn": "Jaldhaka"
        },
        "unitName": "Jaldhaka"
    },
    {
        "id": "fJ6AaMn6QQkV8aiTRPqt",
        "createdAt": "2024-04-03T05:40:16.014Z",
        "unitId": "EySs3P2zDpGwyAgF8mvD",
        "tk": 1100,
        "unit": {
            "id": "EySs3P2zDpGwyAgF8mvD",
            "nmEn": "Jointiapur",
            "createdAt": "2024-04-01T16:19:34.784Z",
            "nmUn": "জৈন্তাপুর",
            "nmBn": "ˆRšÍvcyi"
        },
        "unitName": "Jointiapur"
    },
    {
        "id": "RrfXFTlbDifsX96GWc1K",
        "createdAt": "2024-04-03T05:30:30.365Z",
        "tk": 450,
        "unitId": "tnRgSM0jvXAJUa8tEX3m",
        "unit": {
            "id": "tnRgSM0jvXAJUa8tEX3m",
            "nmUn": "কায়েতপাড়া",
            "createdAt": "2024-04-01T16:24:25.889Z",
            "nmBn": "Kv‡qZcvov",
            "nmEn": "Kayetpara"
        },
        "unitName": "Kayetpara"
    },
    {
        "id": "b9J3N59S77VGSpReQaVw",
        "unitId": "fdn3Dr4cNZxKJu5yERVN",
        "tk": 1100,
        "createdAt": "2024-04-03T05:38:14.816Z",
        "unit": {
            "id": "fdn3Dr4cNZxKJu5yERVN",
            "createdAt": "2024-04-01T16:23:35.643Z",
            "nmBn": "Lv‡minvU",
            "nmUn": "খাসেরহাট",
            "nmEn": "Khaserhat"
        },
        "unitName": "Khaserhat"
    },
    {
        "id": "D1sUKXxgCSjYaPuuYX6w",
        "unitId": "9NE3GTgUWEN15hja7FOj",
        "tk": 700,
        "createdAt": "2024-04-03T05:34:33.418Z",
        "unit": {
            "id": "9NE3GTgUWEN15hja7FOj",
            "nmEn": "Kuripara",
            "nmUn": "কুড়িপাড়া",
            "nmBn": "Kzwocvov",
            "createdAt": "2024-04-01T16:24:00.049Z"
        },
        "unitName": "Kuripara"
    },
    {
        "id": "G7EusQB14tziuSUniNZ4",
        "unitId": "erGaODoJCUO3GwWgOmdK",
        "tk": 1300,
        "createdAt": "2024-04-03T05:38:02.448Z",
        "unit": {
            "id": "erGaODoJCUO3GwWgOmdK",
            "nmUn": "মালগাড়া",
            "createdAt": "2024-04-01T16:24:12.454Z",
            "nmEn": "Malgara",
            "nmBn": "gvjMvov"
        },
        "unitName": "Malgara"
    },
    {
        "id": "8M47OhIOb18fnhIkoiRR",
        "unitId": "PhBaei6UybRWZ2tupnZa",
        "tk": 850,
        "createdAt": "2024-04-03T05:39:48.950Z",
        "unit": {
            "id": "PhBaei6UybRWZ2tupnZa",
            "nmBn": "bvwjZvevox",
            "nmUn": "নালিতাবাড়ী",
            "nmEn": "Nalitabari",
            "createdAt": "2024-04-01T16:22:02.425Z"
        },
        "unitName": "Nalitabari"
    },
    {
        "id": "QRqnings6NyfKHNgOKZY",
        "tk": 1210,
        "createdAt": "2024-04-03T05:36:02.335Z",
        "unitId": "P1RHinACUzCEqnLL1Frb",
        "unit": {
            "id": "P1RHinACUzCEqnLL1Frb",
            "nmUn": "নয়াদিয়াড়ী",
            "createdAt": "2024-04-01T16:20:44.289Z",
            "nmBn": "bqvw`qvox",
            "nmEn": "Noyadiary"
        },
        "unitName": "Noyadiary"
    },
    {
        "id": "LWEvG8dJhKKS1NNQ7hmZ",
        "unitId": "eUUUcOXpdiqlmrSJOYfx",
        "tk": 1150,
        "createdAt": "2024-04-03T05:38:57.133Z",
        "unit": {
            "id": "eUUUcOXpdiqlmrSJOYfx",
            "nmBn": "cv_iNvUv",
            "nmEn": "Patharghata",
            "createdAt": "2024-04-01T16:21:09.457Z",
            "nmUn": "পাথরঘাটা"
        },
        "unitName": "Patharghata"
    },
    {
        "id": "V1DgJ07Dokat5jGVBl6T",
        "tk": 470,
        "unitId": "8kIO8UNLL7ADGIifhrV2",
        "createdAt": "2024-04-03T05:37:04.831Z",
        "unit": {
            "id": "8kIO8UNLL7ADGIifhrV2",
            "nmBn": "ivRvevwo",
            "nmEn": "Rajabari",
            "nmUn": "রাজাবাড়ি",
            "createdAt": "2024-04-01T16:23:08.000Z"
        },
        "unitName": "Rajabari"
    },
    {
        "id": "SCWK1fpv7pGwRDZjL87U",
        "tk": 1170,
        "createdAt": "2024-04-03T05:34:51.209Z",
        "unitId": "LhJND3GtJNyycfZlMxJX",
        "unit": {
            "id": "LhJND3GtJNyycfZlMxJX",
            "nmUn": "রানীরবন্দর",
            "nmBn": "ivbxie›`i",
            "nmEn": "Ranirbandar",
            "createdAt": "2024-04-01T16:21:50.344Z"
        },
        "unitName": "Ranirbandar"
    },
    {
        "id": "UxXwxtMMeNxCUn8NVxmW",
        "createdAt": "2024-04-03T05:30:18.223Z",
        "tk": 1500,
        "unitId": "Ek3X32M8jyfVCGvf4csa",
        "unit": {
            "id": "Ek3X32M8jyfVCGvf4csa",
            "nmUn": "সাতবাড়িয়া",
            "nmBn": "mvZevwoqv",
            "nmEn": "Satbaria",
            "createdAt": "2024-04-01T16:19:21.012Z"
        },
        "unitName": "Satbaria"
    },
    {
        "id": "BuIkRIQ3ln8qfx93bl18",
        "createdAt": "2024-04-03T05:34:13.052Z",
        "unitId": "gLenZX1PEnCSTqAMteME",
        "tk": 600,
        "unit": {
            "id": "gLenZX1PEnCSTqAMteME",
            "createdAt": "2024-04-01T16:17:47.728Z",
            "nmUn": "সখিপুর",
            "nmBn": "mwLcyi",
            "nmEn": "Shokhipur"
        },
        "unitName": "Shokhipur"
    },
    {
        "id": "6eipItAUtqx5XSLpy0hD",
        "createdAt": "2024-04-03T05:27:33.012Z",
        "tk": 600,
        "unitId": "EdGuNRPdhbNzEwOhi12V",
        "unit": {
            "id": "EdGuNRPdhbNzEwOhi12V",
            "nmUn": "সুরুজ",
            "nmBn": "myiæR",
            "createdAt": "2024-04-01T16:23:20.267Z",
            "nmEn": "Suruj"
        },
        "unitName": "Suruj"
    },
    {
        "id": "FYSnZ3ZNF0nWkvPRMm27",
        "tk": 1260,
        "createdAt": "2024-04-03T05:39:25.216Z",
        "unitId": "znPz79HbDCeeu2IfSxhs",
        "unit": {
            "id": "znPz79HbDCeeu2IfSxhs",
            "createdAt": "2024-04-01T16:21:37.600Z",
            "nmEn": "Ulipur",
            "nmBn": "Dwjcyi",
            "nmUn": "উলিপুর"
        },
        "unitName": "Ulipur"
    },
    {
        "id": "J06Z2IXJz1t1r5TsCLpP",
        "unitId": "sDQRAkjsKFFQCywExd78",
        "createdAt": "2024-04-03T05:35:10.105Z",
        "tk": 1010,
        "unit": {
            "id": "sDQRAkjsKFFQCywExd78",
            "createdAt": "2024-04-01T16:19:06.908Z",
            "nmEn": "Vatpara",
            "nmUn": "ভাটপাড়া",
            "nmBn": "fvUcvov"
        },
        "unitName": "Vatpara"
    }
]

const list = data.sort((a, b) => sortArray(a.unit.nmEn.toUpperCase(), b.unit.nmEn.toUpperCase()));

const Talist = () => {

    return (
        <>
            <div className="w-full lg:w-3/4 mx-auto">

                <h1 className="w-full py-10 text-center text-3xl font-bold text-gray-500">TA Taka</h1>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="text-center">SL</th>
                            <th className="text-start pl-4">Post</th>
                            <th className="text-end pr-4">Taka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((ta, i) => (
                            <tr className="border-b border-gray-300" key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-start pl-4">{ta.unit.nmEn}</td>
                                <td className="text-end pr-4">{ta.tk}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Talist;


"use client";
import React, { useState, useEffect } from "react";
import Add from "@/components/project/Add";
import Edit from "@/components/project/Edit";
import Delete from "@/components/project/Delete";
import { getDataFromIndexedDB, setDataToIndexedDB } from "@/lib/DatabaseIndexedDB";

const projectData = [
    {
        "id": "mldUtGg1vsvmPGnTeYlw",
        "name": "3rd AC"
    },
    {
        "id": "XURBsgVT2oexdmdqJunO",
        "name": "3rd AC Field"
    },
    {
        "id": "NN6Fv1myIqVLI6AFKtsK",
        "name": "CateringField"
    },
    {
        "id": "4r0ZBqH0BUyOecMdG6aS",
        "name": "COL"
    },
    {
        "id": "M3gjHxlC9JKYCakZ4Za1",
        "name": "CORE"
    },
    {
        "id": "jfCQq336xm69KkC8iLWq",
        "name": "EDM"
    },
    {
        "id": "hYTP7vS5JYfi3pJV6luM",
        "name": "GO"
    },
    {
        "id": "dQtIiBrvLBPmgZ5FYAVO",
        "name": "IDCOL"
    },
    {
        "id": "ZGCSojweVzizfqhl8dsk",
        "name": "MC"
    },
    {
        "id": "1ZDFqk2zqyZRXUgkH4QN",
        "name": "PLAN"
    },
    {
        "id": "PSe1CShzWGeNjTPuPDNw",
        "name": "SDC & SIDA"
    },
    {
        "id": "wIKHYdUrzwUxC81S2bKo",
        "name": "Trade AC"
    },
    {
        "id": "zxCaatU3KNwozg6kfaGH",
        "name": "TrustFund"
    },
    {
        "id": "oxaN35cKVGXnByvDdIuT",
        "name": "Unicef"
    },
    {
        "id": "WTRxNKG7KSBMJKwgpwN6",
        "name": "YSES"
    }
]


const Project = () => {
    const [projects, setProjects] = useState([]);
    const [waitMsg, setWaitMsg] = useState("");
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const load = async () => {
            setWaitMsg('Please Wait...');
            try {
                const data = await getDataFromIndexedDB("project");
                if (data.length > 0) {
                    setProjects(data);
                } else {
                    await setDataToIndexedDB('project', projectData);
                    setProjects(projectData);
                }
                setWaitMsg('');
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [msg]);


    const messageHandler = (data) => {
        setMsg(data);
    }


    return (
        <>
            <div className="w-full mb-3 mt-8">
                <h1 className="w-full text-xl lg:text-3xl font-bold text-center text-blue-700">Project</h1>
                <p className="w-full text-center text-blue-300">&nbsp;{waitMsg}&nbsp;</p>
                <p className="w-full text-sm text-center text-pink-600">&nbsp;{msg}&nbsp;</p>
            </div>


            <div className="w-full lg:w-3/4 mx-auto border-2 border-gray-200 p-4 shadow-md rounded-md">
                <div className="w-full overflow-auto">
                    <table className="w-full border border-gray-200">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="text-start border-b border-gray-200 px-4 py-2">Name</th>
                                <th className="w-[100px] font-normal">
                                    <div className="w-full flex justify-end items-center pr-2.5 font-normal">
                                        <Add message={messageHandler} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                projects.length ? projects.map(project => {
                                    return (
                                        <tr className="border-b border-gray-200 hover:bg-gray-100" key={project.id}>
                                            <td className="text-start py-2 px-4">{project.name}</td>
                                            <td className="flex justify-end items-center mt-1">
                                                <Edit message={messageHandler} id={project.id} data={project} />
                                                <Delete message={messageHandler} id={project.id} data={project} />
                                            </td>
                                        </tr>
                                    )
                                })
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Project;


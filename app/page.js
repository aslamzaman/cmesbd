"use client";
import React from 'react';
import Link from 'next/link';


const Home = ({ children }) => {

  return (
    <div className="w-full lg:w-3/4 mx-auto">
      <div className='w-full py-20'>
        <h1 className='text-center text-3xl font-bold text-gray-400'>Dashboard</h1>
      </div>
      <div className='w-full max-auto grid grid-cols-2 lg:grid-cols-4 gap-6'>
        <ContentBlock title="Bayprostab" link="/bayprostab" color="bg-blue-800 hover:bg-blue-600" />
        <ContentBlock title="Bayprostab Execution" link="/bayprostabexecution" color="bg-green-800 hover:bg-green-600" />
        <ContentBlock title="Local TA" link="/localta" color="bg-purple-800 hover:bg-purple-600" />
        <ContentBlock title="VAT and TAX Calculation" link="/vattax" color="bg-pink-800 hover:bg-pink-600" />
        <ContentBlock title="Bank Challan Check" link="/challancheck" color="bg-gray-800 hover:bg-gray-600" />
        <ContentBlock title="Formats" link="/format" color="bg-yellow-800 hover:bg-yellow-600" />
        <ContentBlock title="Area Converter" link="/landareaconverter" color="bg-indigo-800 hover:bg-indigo-600" />
        <ContentBlock title="Leave Application" link="/leave" color="bg-red-800 hover:bg-red-600" />
      </div>
    </div>
  )

}

export default Home;


const ContentBlock = ({ title, link, color }) => {
  return <Link href={link} className={`text-center px-4 py-3 font-bold text-white rounded-md focus:ring-1 ring-blue-200 ring-offset-2 duration-300 ${color} cursor-pointer`}>
    {title}
  </Link>
}




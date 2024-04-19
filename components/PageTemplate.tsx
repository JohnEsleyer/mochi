'use client'

import supabase from "@/utils/supabase";
import {useRouter} from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuth } from "@/utils/isauth";
import Image from 'next/image';

interface TemplateProps{
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({children}) => {
  const router = useRouter();
  
  const [authenticate, setAuthenticate] = useState(false);


  useEffect(() => {
    console.log('useEffect executed');
    const fetchData = async () => {
      const res = await isAuth();
      if (res){
        setAuthenticate(true);
      }else{
        router.push('/signin');
      }
    }
    fetchData();
  }, []);  

  async function signOutHandler(){
    const {error} = await supabase.auth.signOut();
    console.log(`signoutHandler: ${error}`);
    router.push('/signin');
  }
  
  return (
        <>
        { authenticate ?

        // If user is authenticated, display the page
        <div className="bg-gray-800 ">
  <div className={` w-screen h-screen min-h-screen text-white font-sans`}>
    <div className="">
        {/* // Start of Navigation bar */}
      <nav id='navbar' className="h-[9vh] pb-2 pt-2 pl-2 pr-2 bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="p-1">
            <a href="/analyzer" className="text-white text-xl font-bold">
              <h1 className='text-s font-bold'>
                <span className='text-pink-300'>M</span>
                <span className='text-grey-200'>o</span>
                <span className='text-green-300'>c</span>
                <span className='text-yellow-200'>h</span>
                <span className='text-orange-300'>i</span>
                <span> AI</span>
              </h1>
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/chat" className="text-purple-300 ">
              Chat AI
            </Link>
            <Link href="/analyser" className="text-orange-300 ">
              Analyser
            </Link>
           
            <Link href="/saved" className="text-yellow-300">
              Saved
            </Link>
            <Link href="/kanji" className="text-pink-300 ">
              Kanji
            </Link>
            <Link href="/hiragana" className="text-amber-300">
              Hiragana
            </Link>
            <Link href="/katakana" className="text-lime-300">
              Katakana
            </Link>
            <Link href="/account" className="text-white-300 ">
              Account
            </Link>
            <button className="text-red-300" onClick={signOutHandler}>
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <button className="text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
        {/* // End of Navigation Bar */}
        {/* // Start of Body  */}
        <hr />
        <div className="h-[90vh]">
        {children}
        </div>
        {/* // End of Body */}
      </div>
    </div>
</div> : 

  // If user not authenticated, display loading indicator
  <div className="bg-gray-800 w-screen h-screen flex justify-center items-center">
    <Image
            src="/loading.svg"
            alt="My SVG"
            width={50}
            height={50}

          />
  </div>}
        </>

    );
}

export default Template;
'use client'

import supabase from "@/utils/supabase";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuth } from "@/utils/isauth";
import Image from 'next/image';

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  const router = useRouter();

  const [authenticate, setAuthenticate] = useState(false);


  useEffect(() => {
    console.log('useEffect executed');
    const fetchData = async () => {
      const res = await isAuth();
      if (res) {
        setAuthenticate(true);
      } else {
        router.push('/signin');
      }
    }
    fetchData();
  }, []);

  async function signOutHandler() {
    const { error } = await supabase.auth.signOut();
    console.log(`signoutHandler: ${error}`);
    router.push('/signin');
  }

  return (
    <>
      {authenticate ?

        // If user is authenticated, display the page
          <div className="bg-gray-800 ">
            <div className={` w-screen h-screen min-h-screen text-white font-sans`}>
              <div className="h-full flex flex-col">
                {/* // Start of Navigation bar */}
                <nav id='navbar' className="h-12 pb-2 pt-2 pl-2 pr-2 bg-gray-900">
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
                    <div className="text-xs lg:text-base md:flex space-x-4">
                      <Link href="/chat" className="text-purple-300 ">
                        Chat AI
                      </Link>
                      <Link href="/analyser" className="text-orange-300 ">
                        Analyser
                      </Link>
                      <Link href="/saved" className="text-blue-300">
                        Saved
                      </Link>
                      <Link href="/hiragana" className="text-amber-300">
                        Hiragana
                      </Link>
                      <Link href="/katakana" className="text-lime-300">
                        Katakana
                      </Link>
                      {/* <Link href="/home" className="text-white-300 ">
                        Home
                      </Link> */}
                      <button className="text-red-300" onClick={signOutHandler}>
                        Logout
                      </button>
                    </div>
                   
                  </div>
                </nav>
                {/* // End of Navigation Bar */}
                {/* // Start of Body  */}
                <hr />
                <div className="flex-1">
                
                  
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
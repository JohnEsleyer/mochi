'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import supabase from "@/utils/supabase";


export default function SignUp() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(String);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  

  useEffect(() => {
    if (isLoggedIn){
      router.push('/chat');
    }
  }, [isLoggedIn]);
  
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    if (password !== passwordConfirmation) {
      alert('Password and password confirmation do not match');
      return;
    }
    
    setIsLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    try {
      const {data, error} = await supabase.auth.signUp(payload);

      if (!error){
        setIsLoggedIn(true);
      }else{
        setErrorText('Sign up failed. ' + error.message);
      }
 
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return  (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      {/* // Start of Sign In Container */}
      <div className="max-w-md w-full p-6 bg-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-white">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-white">Password</label>
            <input
              type="password"
              placeholder="******"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passwordConfirmation" className="block mb-2 text-white">Confirm Password</label>
            <input
              type="password"
              placeholder="******"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              required
            />
          </div>
          <button type="submit" className="w-full text-black bg-orange-200 py-2 rounded">
            Sign Up
          </button>
        </form>

        {errorText != "" && <p className="text-red-400 pt-2">{errorText}</p>}
        {/* // Start Loading Indicator */}
        <div className="flex justify-center">
          {isLoading && <Image
            src="/loading.svg"
            alt="My SVG"
            width={50}
            height={50}

          />}
        </div>
        {/* // End of Loading Indicator */}
        <a className="flex justify-center w-full text-white underline" href="/signin">
          <p>Sign In</p>
        </a>
       
      </div>
      {/* // End of Sign In Container */}
    </div>
  );
}

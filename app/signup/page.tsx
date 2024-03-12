'use client'

import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import Image from 'next/image';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(String);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn){
      router.push("/home");
      return
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
      const response = await fetch('api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const {status} = data;
      if (status == 200){
        setIsLoggedIn(true);
      }else if(status == 400){
        setErrorText('Authentication failed. Please ensure your credentials are correct.');
      }
 
    } catch (error) {

      console.log(error);
    }
    setIsLoading(false);
  };

  return  (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      {/* // Start of Sign In Container */}
      <div className="max-w-md w-full p-6 bg-gray-700 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-white">Email</label>
            <input
              type="email"
              id="email"
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

       
      </div>
      {/* // End of Sign In Container */}
    </div>
  );
}

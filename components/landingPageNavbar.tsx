import Link from "next/link";


export default function LandingPageNavbar(){
    return (
        <nav className="py-4 h-22 bg-gray-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold">
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
          <div className="flex space-x-4">
            <Link href="/signup" className="p-2 text-black bg-orange-200 rounded-lg">
              Sign Up
            </Link>
            <Link href="/signin" className="flex items-center text-white hover:text-gray-300">
              Sign In
            </Link>
            <Link href="/about" className="flex items-center text-white hover:text-gray-300">
              About
            </Link>
          </div>

        </div>
      </nav>
    );
}
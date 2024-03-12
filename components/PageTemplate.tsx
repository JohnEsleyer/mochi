import Link from "next/link";




export default function Template({ className, children }: { className: string; children: React.ReactNode }){
    return (
        <>
        <div className="bg-gray-800">
  <div className={` ${className}  min-h-screen justify-center bg-gray-800 text-white font-sans`}>
    <div>
        {/* // Start of Navigation bar */}
      <nav className="pb-2 pt-2 pl-2 pr-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="p-1">
            <a href="#" className="text-white text-xl font-bold">
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
            <Link href="/chat" className="text-purple-300 hover:animate-shake">
              Chat AI
            </Link>
            <Link href="/home" className="text-orange-300 hover:animate-shake">
              Analyzer
            </Link>
            <Link href="/learn" className="text-green-300 hover:animate-shake">
              Learn
            </Link>
            <Link href="/saved" className="text-yellow-300 hover:animate-shake">
              Saved
            </Link>
            <Link href="/kanji" className="text-pink-300 hover:animate-shake">
              Kanji
            </Link>
            <Link href="/hiragana" className="text-amber-300 hover:animate-shake">
              Hiragana
            </Link>
            <Link href="/katakana" className="text-lime-300 hover:animate-shake">
              Katakana
            </Link>
            <Link href="/account" className="text-white-300 ">
              Account
            </Link>
            <Link href="/signout" className="text-red-300">
              Logout
            </Link>
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
        {children}
        {/* // End of Body */}
    </div>
  </div>
</div>
        </>

    );
}
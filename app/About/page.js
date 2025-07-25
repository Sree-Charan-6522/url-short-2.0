import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className="min-h-[53.7em] bg-[#1e1e1e] text-white flex flex-col justify-center items-center gap-3 max-md:h-[50em] max-md:w-full max-md:gap-2 max-md:justify-start max-md:!px-5 max-md:!py-3">
      <h1 className="!text-4xl font-bold mb-4 text-[#FF4C4C]">About Us</h1>
      <p className="max-w-2xl text-center !text-lg text-gray-300">
        Welcome to our URL Shortener! We built this tool to be simple, fast, and completely privacy-focused.
        No logins, no tracking — just paste and shorten your links.
      </p>
      <p className="max-w-2xl text-center mt-4 text-gray-400">
        Created using Next.js and Tailwind CSS, this app works great on mobile, tablet, and desktop.
        We believe in open access, and you can even find our code on GitHub!
      </p>
      <div className='h-50 w-80 relative'>

      <Image src="/http.gif" fill  alt='httpgif'/>
      </div>
    </div>
  )
}

export default About

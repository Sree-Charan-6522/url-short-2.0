import React from 'react'
import { siNextdotjs } from "simple-icons/icons";
import Link from 'next/link';

const Footer = () => {
  return (
    // max-md:bottom-[-260px]
    <div className='fixed bottom-0  text-white w-full shadow-[0px_-15px_45px_#FF4C4C33] flex flex-col bg-[#444444] items-center justify-center h-15'>
    <div className='flex items-center gap-2 text-sm'>
      <span>Created with</span>
      <Link target='_blank' href="https://nextjs.org/"><svg role="img" viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: siNextdotjs.svg }} fill={`#${siNextdotjs.hex}`}/></Link>
      <span className='hover:underline hover:text-red-500 duration-300'>by <Link target='_blank'  href="https://github.com/Sree-Charan-6522"><strong>MEDHABOINA SREE CHARAN</strong></Link></span>
    </div>
        <p className='max-md:static absolute bottom-1 left-1 text-red-500 hover:text-white cursor-pointer'>Version: v2.0.1</p>
  </div>
  )
}

export default Footer

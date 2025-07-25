// Description: A responsive navigation bar component for a URL shortener application.
'use client'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react' // icon libra</div>ry (optional)
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from "react";
import { motion } from 'framer-motion'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session,status } = useSession()

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && !hasShownToast.current) {
      toast.success(`Welcome back, ${session?.user?.name}!`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      hasShownToast.current = true;
    }
  }, [session, status]);

  const handleSignOut = async () => {
    toast.success('Yo signed out!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });

    setTimeout(async () => {
      await signOut({ redirect: false }); // prevent immediate page reload
    }, 1000); // let toast show before signing out
  };
  
  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Flip}
    />
      <nav className="bg-[#444444] text-white shadow-[0px_15px_45px_#FF4C4C33] max-md:!px-6 !py-2  relative">
        <div className="flex justify-around max-md:justify-between  items-center">
          <div className="max-md:hidden text-xl font-bold text-accent-red"><Link href="/">URL-Shortener</Link></div>
          <div className="hidden max-md:block text-xl font-bold text-accent-red"><Link href="/">URL-S</Link></div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex gap-6 items-center text-sm text-dark-muted">
            <Link href="/"><li onClick={()=>{}}className="hover:text-[#FF4C4C] cursor-pointer">Home</li></Link>
            <Link href="/About"><li className="hover:text-[#FF4C4C] cursor-pointer">About</li></Link>
            <Link href="/Contact"><li className="hover:text-[#FF4C4C] cursor-pointer">Contact Us</li></Link>
            <Link href="/history"><li className="hover:text-[#FF4C4C] cursor-pointer">History</li></Link>
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex gap-5 h-8">          
          <motion.div className='hover:!text-lg' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button className="border border-accent-red text-accent-red hover:bg-accent-red hover:text-white !px-2 !py-1 rounded !text-sm">
              {session ? (
                
                <div className='flex gap-2 items-center cursor-pointer !text-sm' onClick={() => { handleSignOut()}}>
                  <img src={session.user.image} className='h-4 w-4 rounded' alt="" />
                  <span>{session.user.name}</span>
                </div>
              ) : (
                <Link href="/login">Login</Link>
              )
            }
            </button>
            </motion.div>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden !mt-4 bg-dark-contrast rounded-lg !p-4 space-y-2 !text-sm text-dark-muted ">
            <div className='flex flex-col justify-center items-center gap-2 !mb-4'>
              <Link className='hover:text-[#FF4C4C]' href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link className='hover:text-[#FF4C4C]' href="/About" onClick={() => setIsOpen(false)}>About</Link>
              <Link className='hover:text-[#FF4C4C]' href="/Contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
              <Link className='hover:text-[#FF4C4C]' href="/history" onClick={() => setIsOpen(false)}>History</Link>
            </div>
            <div className="!pt-2 flex flex-col gap-2">
              <button className="border border-accent-red text-accent-red hover:bg-accent-red hover:text-white !px-4 !py-2 rounded !text-sm">
                {session ? (
                  <div className='flex gap-2 items-center' onClick={() => handleSignOut()}>
                    <img src={session.user.image} className='h-6 w-6 rounded' alt="" />
                    <span>{session.user.name}</span>
                  </div>

                ) : (
                  <Link href="/login">Login</Link>
                )
                }
              </button>
            </div>
          </div>
        )}
      </nav>

    </>
  )
}

export default NavBar

'use client'

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { motion } from "framer-motion";

const Login = () => {
    const { data: session } = useSession()
    if (session) {
        return <>
            <div >
                <div className=" mt-42 text-center font-extrabold text-2xl sm:text-3xl md:text-4xl flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <span>Signed in as Username:</span>
                    <span className="underline cursor-pointer">{session.user.name}</span>
                </div>
                <button onClick={() => signOut()} className="mt-6 flex items-center gap-2 px-6 py-2 rounded-3xl cursor-pointer  bg-[var(--Purple)] text-white transition-all duration-300 ease-in-out  hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500  hover:text-white hover:shadow-lg hover:-translate-y-1 hover:scale-105">
                    <span className="font-semibold text-sm">Sign out</span>
                </button>
            </div>
        </>
    }
    else {
        return (
            <div className='flex justify-center items-center w-screen h-[50em]'>
                <div className="h-[321px] w-[352px] flex flex-col justify-around items-center !px-5 !py-6 rounded-3xl !border !border-cyan-300" >
                    <h2 className='!text-2xl text-center'>Sign in to access all the content.</h2>
                    <motion.div className='hover:!text-lg' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button onClick={() => signIn("google", { callbackUrl: '/' })} className=" cursor-pointer group w-full h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-500 focus:bg-blue-50 active:bg-blue-100">
                        <div className="flex items-center justify-center !space-x-4">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 32 32" fill="none">
                                <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4" />
                                <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853" />
                                <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05" />
                                <path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335" />
                            </svg>              <span className="font-semibold text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600">
                                Continue with Google
                            </span>
                        </div>
                    </button>
                                    </motion.div>
                                    <motion.div className='hover:!text-lg' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button onClick={() => signIn("github", { callbackUrl: '/' })} className="cursor-pointer group w-full h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-500 focus:bg-blue-50 active:bg-blue-100">
                        <div className="flex items-center justify-center !space-x-4 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 text-gray-700 dark:text-white" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            <span className="font-semibold text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600">
                                Continue with GitHub
                            </span>
                        </div>
                    </button>
                                                    </motion.div>
                    <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
                        <p className="text-xs">
                            By proceeding, you agree to our <Link href="/terms-of-service/" className="underline text-blue-600">Terms of
                                Service</Link> and confirm you have read our <Link href="/privacy-policy/"
                                    className="underline text-blue-600">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

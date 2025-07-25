"use client";
import React, { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { data: session } = useSession();


  const formRef = useRef(null);

  const popMesg = (e) => {
    const form = formRef.current;
    const name = form.querySelector("#name").value?.trim() || "";
    const email = form.querySelector("#email").value?.trim() || "";
    const message = form.querySelector("#message").value?.trim() || "";

    if (!name || !email || !message) {
      toast.warn('Please fill in all fields before submitting!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
      });
      e.preventDefault();
    } else {
      toast.success('Submitted!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
      });
      form.reset(); // Reset the form fields after submission
      e.preventDefault(); // Prevent page reload
    }
  }

  if (!session) {
    return (
      <div className="min-h-[53.7em] bg-[#1e1e1e] text-white flex flex-col justify-center items-center !px-6 max-md:justify-start max-md:!py-5">
        <h1 className="!text-4xl font-bold text-[#FF4C4C] !mb-6">Please Login</h1>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button className="!px-4 !py-2 rounded">
            <Link href="/login">Login</Link>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
      <div className="min-h-[53.7em] bg-[#1e1e1e] text-white flex flex-col justify-center items-center px-6 max-md:justify-start max-md:py-5">

        <h1 className="text-4xl font-bold mb-4 text-[#FF4C4C]">Contact Us</h1>
        <p className="text-lg text-center text-gray-300 mb-6">
          Have questions, feedback, or just want to say hi? Drop us a message below.
        </p>
        <form
          ref={formRef}
          // onSubmit={()=>handleSubmit()}
          className="w-full max-w-md flex flex-col gap-4 items-center"
        >
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-[#444444] text-white w-[325px] max-md:w-[265px] px-4 py-2 rounded focus:outline-none"
          />
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="bg-[#444444] text-white w-[325px] max-md:w-[265px] px-4 py-2 rounded focus:outline-none"
          />
          <textarea
            id="message"
            placeholder="Your Message"
            className="bg-[#444444] text-white w-[325px] max-md:w-[265px] px-4 py-2 rounded h-32 resize-none focus:outline-none"
          />
          <div className="h-10" >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button
                onClick={(e) => popMesg(e)}
                type="submit"
                className="bg-[#FF4C4C] disabled:bg-gray-600 hover:bg-[#e13a3a] text-white px-4 py-2 rounded font-medium cursor-pointer"
              >
                Send Message
              </button>
            </motion.div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;

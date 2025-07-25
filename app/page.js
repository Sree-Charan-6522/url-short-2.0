"use client"

import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function Home() {

  const TypewriterEffect = () => {
    const text = [
      "Our URL Shortener is fast, efficient, and easy to use.",
      "No personal information required – Just shorten and share.",
      "Your privacy is our priority, and we don’t track you!",
      "Welcome to our URL Shortener! We make linking easy and simple."
    ];
    const [displayedText, setDisplayedText] = useState("");
    const [ti, setTi] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
      let typingInterval;
      if (index < text[ti].length) {
        typingInterval = setInterval(() => {
          setDisplayedText((prevText) => prevText + text[ti][index]);
          setIndex((prevIndex) => prevIndex + 1);
        }, 70);
      } else {
        // Pause before starting next sentence
        const pauseTimeout = setTimeout(() => {
          setDisplayedText("");
          setIndex(0);
          setTi((prevTi) => (prevTi + 1) % text.length);
        }, 1200);
        return () => clearTimeout(pauseTimeout);
      }
      return () => clearInterval(typingInterval);
    }, [index, ti]);

    return (
      <motion.div
        className="text-center mt-8 text-sm sm:text-base text-gray-300 px-4 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          {displayedText}
          <motion.span
            className="font-bold text-lg sm:text-xl"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            |
          </motion.span>
        </p>
      </motion.div>
    );
  };

  const [longUrl, setLongUrl] = useState('');
  const [shortName, setShortName] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');

  const handleShorten = async () => {
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, shortName }),
      });

      const data = await response.json();

      if (response.ok) {
        // for vercel
        setShortenedLink(`https://url-shortener-q7ip.vercel.app/${data.shortName}`);
        // for local testing
        // setShortenedLink(`http://localhost:3000/${data.shortName}`);
      } else {
        alert(data.error || 'Error shortening URL');
      }

      setLongUrl('');
      setShortName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputs = (e) => {
    e.preventDefault();
    if (longUrl.trim() !== '' && shortName.trim() !== '') {
      handleShorten();
    } else {
      alert('Please fill in both fields!');
    }
  };

  return (
    <div className="relative w-full bg-dark text-white">
      <div
        className="flex flex-col items-center justify-start w-full px-4 py-10 sm:py-16 gap-12 max-md:min-h-[140vh] max-md:overflow-y-auto">
         {/* modify below  Header good and neat look         */}
        <div className="w-full max-w-4xl text-left max-md:text-center !mt-10 !mb-8">
          <h1 className="!text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            The best <strong><Link href="/">URL-Shortener</Link></strong> in the Market
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed !mt-4 !mx-2">
            We are the most straightforward URL Shortener in the world.
            Most of the other shorteners will track you or ask you to sign in.
            We understand your needs — so we built this to make your experience simple and private.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-md bg-dark-contrast rounded-xl border border-gray-600 px-6 py-8 shadow-lg">
          <h2 className="!text-2xl font-semibold text-center mb-3 text-white">Shorten Your Links</h2>
          <p className="text-center text-sm text-gray-400 !my-3">Paste your long URL below to shorten it.</p>

          <form onSubmit={handleInputs} className="flex flex-col gap-5 !mx-4">
            <input
              type="text"
              placeholder="Enter your long URL"
              className="w-full h-12 px-4 rounded-md bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <input
              type="text"
              placeholder="Custom short name"
              className="w-full h-12 px-4 rounded-md bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-12 bg-accent-red hover:bg-accent-redHover text-white font-medium text-base rounded-md transition-all duration-200"
            >
              Shorten
            </motion.button>
          </form>

          {shortenedLink && (
            <div className="!mt-5 text-center">
              <p className="text-sm text-gray-300 ">
                Shortened URL:{' '}
                <a
                  href={shortenedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-words !underline"
                  >
                  {shortenedLink} click Here
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Typewriter Effect */}
        <TypewriterEffect />
      </div>
    </div>
  );
}

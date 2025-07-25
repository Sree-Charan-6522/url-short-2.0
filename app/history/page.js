"use client";

import React, { useEffect, useState } from "react";

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/shorten");
            const data = await res.json();
            setHistory(data.urls || []);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (shortName) => {
        try {
            const res = await fetch(`/api/shorten?shortName=${shortName}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok) {
                alert("Deleted successfully");
                setHistory(prev => prev.filter(item => item.shortName !== shortName));
            } else {
                alert(data.error || "Failed to delete");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Something went wrong");
        }
    };


    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className="w-full bg-dark text-white min-h-screen flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto w-full">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-8 sm:mb-12 leading-tight !mt-8">
                    🔗 Your <span className="text-accent-red">Shortened</span> URL History
                </h1>

                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : history.length === 0 ? (
                    <p className="text-center text-gray-400">No URLs shortened yet.</p>
                ) : (
                    <div className="flex flex-col gap-4 sm:gap-5 !mt-8 !mb-[75px] !mx-4">
                        {history.map((item, index) => (
                            <div
                                key={index}
                                className="bg-dark-contrast border border-gray-600 rounded-xl p-4 sm:p-6 shadow-lg transition hover:shadow-xl relative"
                            >
                                <div
                                    style={{
                                        background: "#1a202c", // A slightly lighter dark background for the inner div
                                        borderRadius: "8px",
                                        padding: "10px",
                                        border: "1px solid #4b5563", // A subtle border
                                    }}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 "
                                >
                                    <div className="flex-grow">
                                        <div className="mb-2">
                                            <p className="text-md text-gray-300 mb-1">
                                                original : <span className="text-blue-400 break-words">{item.longUrl}</span>
                                            </p>
                                            <p className="text-md  text-gray-400 width: 90%  ">
                                                short name : <span className="text-green-400 break-words">{item.shortName}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3 justify-end">
                                        {/* Mobile: Delete button - left bottom */}
                                        <button 
                                            className="sm:hidden flex items-center justify-center  bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                                            onClick={() => handleDelete(item.shortName)}
                                            title="Delete"
                                        >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                colors="primary:#ffffff,secondary:#ffffff"
                                                style={{
                                                    width: "28px",
                                                    height: "25px"
                                                }}>
                                            </lord-icon>
                                        </button>
                                        {/* Mobile: Open Original URL button */}
                                        <button 
                                            className="sm:hidden flex items-center justify-center  bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                                            onClick={() => window.open(item.longUrl, "_blank")}
                                            title="Open Original URL"
                                        >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/evxithfv.json"
                                                trigger="hover"
                                                colors="primary:#ffffff,secondary:#ffffff"
                                                style={{
                                                    width: "28px",
                                                    height: "25px"
                                                }}
                                            >
                                            </lord-icon>
                                        </button>
                                    </div>
                                    <div className="flex sm:flex-col gap-2 sm:gap-3 justify-end">
                                        {/* Desktop: Delete button */}
                                        <button
                                            className="hidden sm:flex items-center justify-center  bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
                                            onClick={() => handleDelete(item.shortName)}
                                            title="Delete"
                                        >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/jzinekkv.json"
                                                trigger="hover"
                                                colors="primary:#ffffff,secondary:#ffffff"
                                                style={{ 
                                                    width: "28px",
                                                    height: "25px"
                                                }}>
                                            </lord-icon>
                                        </button>
                                        {/* Desktop: Open Original URL button */}
                                        <button
                                            className="hidden sm:flex items-center justify-center  bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                                            onClick={() => window.open(item.longUrl, "_blank")}
                                            title="Open Original URL"
                                        >
                                            <lord-icon
                                                src="https://cdn.lordicon.com/evxithfv.json"
                                                trigger="hover"
                                                colors="primary:#ffffff,secondary:#ffffff"
                                                style={{ 
                                                    width: "28px",
                                                    height: "25px"
                                                }}
                                            >
                                            </lord-icon>
                                        </button>
                                    </div>
                                </div>
                                <a
                                    href={item.longUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: "none",
                                        display: "block"
                                    }}
                                >
                                    <p className="mt-3 text-xs text-gray-500">
                                        {item.createdAt && (
                                            <>Created on: {new Date(item.createdAt).toLocaleString()}</>
                                        )}
                                    </p>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

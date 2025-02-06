"use client";
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-indigo-800 to-indigo-900 shadow-lg sticky top-0 z-10 transition-all duration-300 ease-in-out">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    {/* Mobile Menu Toggle Button */}
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 text-white hover:text-yellow-400 focus:outline-none transition-all duration-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6 transform rotate-45 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 transform rotate-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <span className="text-3xl font-extrabold text-white cursor-pointer hover:text-yellow-400 transition-all duration-300 transform hover:scale-105">
                                    E-Store
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:space-x-8 sm:justify-center w-full">
                        <Link href="/">
                            <span className="text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                                Home
                            </span>
                        </Link>
                        <Link href="/about">
                            <span className="text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                                About
                            </span>
                        </Link>
                        <Link href="/products">
                            <span className="text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                                Products
                            </span>
                        </Link>
                        <Link href="/cart">
                            <span className="text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                                Cart
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`sm:hidden ${mobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-all duration-500 ease-in-out`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-lg shadow-lg">
                    <Link href="/">
                        <span className="block text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                            Home
                        </span>
                    </Link>
                    <Link href="/about">
                        <span className="block text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                            About
                        </span>
                    </Link>
                    <Link href="/products">
                        <span className="block text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                            Products
                        </span>
                    </Link>
                    <Link href="/cart">
                        <span className="block text-lg text-white font-semibold hover:text-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105">
                            Cart
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import Link from "next/link";
import Image from "next/image"; 
import hero from "../images/hero.jpg"; 
const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-indigo-700 to-indigo-900 text-black p-8 overflow-hidden">
            {/* Hero Image with Next.js Image Component */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={hero} 
                    alt="Hero image" 
                    layout="fill" 
                    objectFit="cover" // This ensures the image covers the section properly
                    quality={100} 
                    priority // Makes sure the image loads immediately
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative py-20 md:py-32">
                    {/* Animated SVG Background */}
                    <div className="absolute inset-0 overflow-hidden z-10">
                        <svg
                            className="absolute top-0 left-0 w-full h-full animate-pulse opacity-20"
                            preserveAspectRatio="xMidYMid slice"
                            fill="none"
                            viewBox="0 0 1463 502"
                            aria-hidden="true"
                        >
                            <path
                                fill="rgba(255, 255, 255, 0.1)"
                                d="M-164 329L0 473l1463-1463-164-164L0 329z"
                            />
                        </svg>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-20 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl animate__animated animate__fadeIn">
                            Welcome to Our E-Store
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl sm:max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
                            Discover an exciting range of products and a seamless shopping experience with us. Find what you love today!
                        </p>

                        {/* Shop Now Button */}
                        <div className="mt-8">
                            <Link
                                href="/products"
                                className="inline-block bg-yellow-500 text-gray-900 py-3 px-8 rounded-full font-semibold text-lg transition-all duration-300 transform hover:bg-yellow-400 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

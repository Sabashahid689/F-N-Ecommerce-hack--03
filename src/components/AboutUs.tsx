import Image from 'next/image';
import AboutImage from "@/images/About.png";  // Update with your actual image path

const AboutUs = () => {
    return (
        <section className="bg-gradient-to-r from-blue-900 via-indigo-400 to-indigo-600 py-20 px-6 sm:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Section - Text */}
                    <div className="text-center lg:text-left space-y-6">
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            Welcome to E-Store
                        </h2>
                        <p className="text-lg text-gray-200 opacity-90">
                            E-Store is your go-to destination for high-quality products and unbeatable deals. We provide a seamless shopping experience with exceptional customer service. Our goal is to make online shopping simple, enjoyable, and hassle-free.
                        </p>
                    </div>

                    {/* Right Section - Image */}
                    <div className="relative">
                        <div className="relative group">
                            <Image
                                src={AboutImage}
                                alt="About Us Image"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-500 transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 rounded-xl group-hover:opacity-0 transition-opacity duration-300"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;

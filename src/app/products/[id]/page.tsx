"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SuccessModal from '@/components/SuccessModal';
import Image from 'next/image';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    quantity: number;
    rating: {
        rate: number;
        count: number;
    };
}

const SingleProduct = () => {
    const [data, setData] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setData(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    const handleAddToCart = () => {
        if (!data) return;

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productExists = existingCart.find((item: Product) => item.id === data.id);
        let updatedCart;
        if (productExists) {
            updatedCart = existingCart.map((item: Product) =>
                item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...existingCart, { ...data, quantity: 1 }];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setSuccessMessage('Product added to cart successfully!');
        setIsModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {!data ? (
                    <div className="text-center">
                        <p className="text-3xl text-gray-600">Loading product...</p>
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col md:flex-row md:space-x-12">
                        {/* Product Image */}
                        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                            <Image
                                src={data.image}
                                alt={data.title}
                                width={500}
                                height={500}
                                className="object-contain h-80 w-80 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="md:w-1/2">
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{data.title}</h1>
                            <p className="text-lg text-gray-700 mb-6">{data.description}</p>
                            <p className="text-2xl text-green-600 font-semibold mb-4">${data.price}</p>
                            <p className="text-lg text-gray-600 mb-4">
                                <strong>Category:</strong> {data.category}
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                <strong>Rating:</strong> {data.rating.rate} ({data.rating.count} reviews)
                            </p>

                            {/* Add to Cart Button */}
                            <div className="flex justify-center mt-auto">
                                <button
                                    onClick={handleAddToCart} // Add the product to localStorage
                                    className="bg-yellow-500 text-white py-3 px-8 rounded-lg hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                vCart={true}
                message={successMessage}
            />
        </div>
    );
};

export default SingleProduct;

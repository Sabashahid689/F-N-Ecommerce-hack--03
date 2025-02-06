"use client";

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import SuccessModal from '@/components/SuccessModal';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const Cart = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
    });
    const router = useRouter();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    const handleRemoveFromCart = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleQuantityChange = (id: number, delta: number) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(false);
        setIsModalOpen2(true);
        setSuccessMessage("Your Order Has Been Placed Successfully");
        localStorage.removeItem('cart');
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center md:text-left">Your Shopping Cart</h1>
                {cart.length === 0 ? (
                    <>
                        <div className="text-center text-xl text-gray-600">Your cart is empty, add something.</div>
                        <div className="flex justify-center w-full mt-8">
                            <Link
                                href="/products"
                                className="inline-block bg-yellow-500 text-gray-900 py-3 px-8 rounded-md font-medium hover:bg-yellow-600 transition-all"
                            >
                                View Products
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="bg-white shadow-xl rounded-lg p-6 mb-8 space-y-6">
                        {cart.map((product) => (
                            <div key={product.id} className="flex items-center justify-between border-b pb-6 transition-all hover:shadow-lg rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex items-center gap-6">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-lg border"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-semibold text-gray-900">{product.title}</h2>
                                        <p className="text-lg text-gray-700">Price: ${product.price.toFixed(2)}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <button
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-600 transition-all"
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="text-lg font-medium">{product.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(product.id, 1)}
                                                className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-600 transition-all"
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center ml-6">
                                    <p className="text-lg font-bold text-gray-900">
                                        ${(product.price * product.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        className="text-red-500 hover:text-red-600 hover:underline mt-2"
                                    >
                                        <FaTrashAlt className="w-6 h-6 inline-block" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-6">
                            <h3 className="text-2xl font-semibold text-gray-900">Total: ${getTotalPrice().toFixed(2)}</h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-yellow-500 text-white py-4 px-10 rounded-lg text-lg font-medium hover:bg-yellow-600 transition-all"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                cart={cart}
                form={form}
                handleInputChange={handleInputChange}
            />

            <SuccessModal
                isOpen={isModalOpen2}
                onClose={() => router.push('/')}
                vCart={false}
                message={successMessage}
            />
        </div>
    );
};

export default Cart;

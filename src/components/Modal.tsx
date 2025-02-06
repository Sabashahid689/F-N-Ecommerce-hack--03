import Image from 'next/image';
import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  cart: Product[];
  form: {
    name: string;
    email: string;
    address: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, cart, form, handleInputChange }) => {
  if (!isOpen) return null;

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[80vh] overflow-y-auto transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl focus:outline-none transition-all"
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Checkout</h2>
        
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <div>
              {cart.map((product) => (
                <div key={product.id} className="flex items-center mb-6 border-b pb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="h-24 w-24 object-cover rounded-lg border mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-gray-900">{product.title}</h4>
                    <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
                    <p className="text-gray-700">Quantity: {product.quantity}</p>
                    <p className="text-gray-700 font-semibold">Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="text-2xl font-bold text-gray-900">
                Total: ${calculateTotal()}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <textarea
              name="address"
              value={form.address}
              onChange={handleInputChange}
              placeholder="Address"
              rows={4}
              className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg w-full text-lg font-semibold hover:bg-yellow-600 transition-all"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

'use client';

import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Class 40 Drone Kit',
    category: 'Drones',
    price: 599,
    image: '/images/products/class40-drone.jpg',
    description: '40cm professional drone soccer kit with protective cage',
  },
  {
    id: 2,
    name: 'Class 20 Racing Drone',
    category: 'Drones',
    price: 499,
    image: '/images/products/class20-drone.jpg',
    description: 'Elite 20cm drone for competitive soccer and racing',
  },
  {
    id: 3,
    name: 'FPV Racing Goggles',
    category: 'Accessories',
    price: 299,
    image: '/images/products/fpv-goggles.jpg',
    description: 'High-resolution FPV goggles with head tracking',
  },
  {
    id: 4,
    name: 'Pro Controller',
    category: 'Controllers',
    price: 199,
    image: '/images/products/controller.jpg',
    description: 'Professional-grade remote controller with customizable settings',
  },
  {
    id: 5,
    name: 'Team Jersey',
    category: 'Apparel',
    price: 49,
    image: '/images/products/jersey.jpg',
    description: 'Official team jersey in multiple sizes',
  },
  {
    id: 6,
    name: 'Training Arena Set',
    category: 'Equipment',
    price: 899,
    image: '/images/products/arena.jpg',
    description: 'Portable training arena with goals and boundary markers',
  },
  {
    id: 7,
    name: 'Spare Battery Pack (5x)',
    category: 'Accessories',
    price: 89,
    image: '/images/products/batteries.jpg',
    description: 'Set of 5 high-capacity LiPo batteries',
  },
  {
    id: 8,
    name: 'Repair & Maintenance Kit',
    category: 'Equipment',
    price: 79,
    image: '/images/products/repair-kit.jpg',
    description: 'Complete toolkit for drone maintenance and repairs',
  },
  {
    id: 9,
    name: 'Pilot Cap',
    category: 'Apparel',
    price: 29,
    image: '/images/products/cap.jpg',
    description: 'Drone Soccer team cap with embroidered logo',
  },
];

const categories = ['All', 'Drones', 'Controllers', 'Accessories', 'Equipment', 'Apparel'];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-primary-blue to-primary-red flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Shop
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-200">
            Premium drones, equipment, and gear for competitive pilots
          </p>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary-blue to-primary-red text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-primary-red/10"></div>
                  <svg className="w-24 h-24 text-gray-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-700">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-bold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-orbitron font-bold text-gradient">
                      ${product.price}
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-red text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <h3 className="font-orbitron text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}

        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $100</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">1-year warranty on all drones</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">24/7 customer service</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our experts are here to help you find the perfect equipment for your needs
          </p>
          <a
            href="/apply"
            className="px-8 py-4 bg-white text-primary-blue font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

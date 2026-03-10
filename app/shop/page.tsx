'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Загрузка товаров из API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    // pt-[220px] нужен, так как у нас высокие фиксированные Header + SponsorsBar
    <div className="min-h-screen bg-gray-50 pt-[220px] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Заголовок страницы */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-gray-900 mb-4">
            Drone Shop
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional equipment for Drone Soccer. Kits, spare parts, and accessories.
          </p>
        </motion.div>

        {/* Telegram Banner (Новый дизайн) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full mb-12"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-[#229ED9] to-[#0088cc] rounded-2xl shadow-xl p-6 md:p-8">
            {/* Декоративные круги на фоне */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {/* Иконка Telegram */}
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm shadow-inner flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z" />
                  </svg>
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Order via Telegram
                  </h2>
                  <p className="text-blue-50 text-sm md:text-base">
                    Click on any product card to start a chat directly with our manager.
                  </p>
                </div>
              </div>

              <a
                href="https://t.me/teshabayevv"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white text-[#0088cc] px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>@teshabayevv</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.a
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                // Ссылка с предзаполненным сообщением
                href={`https://t.me/teshabayevv?text=Hello, I am interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur text-primary-blue px-4 py-2 rounded-full font-semibold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm">
                      Order Now
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                      {product.category}
                    </span>
                    {product.inStock ? (
                      <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> In Stock
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-red-500">Out of Stock</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  {/* Price & Arrow */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-primary-blue">
                      ${product.price}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
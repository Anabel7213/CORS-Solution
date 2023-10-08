"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex justify-center items-center gap-4 flex-col m-16">
      <h1 className="font-bold text-2xl uppercase">Sample Products:</h1>

      <div className="flex gap-4 flex-wrap sm:m-4 lg:mx-16 lg:mt-4 lg:mb-16 justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="border flex items-start rounded-lg flex-col p-6 gap-2 lg:w-[248px] sm:w-full"
          >
            <Image
              src={product.images[0].url}
              width={236}
              height={200}
              alt="Product Image"
              className="lg:w-[236px] lg:h-[200px] sm:w-full object-contain"
            />
            <div className="flex flex-col gap-4 items-start w-full">
              <h1 className="text-sm uppercase sm:h-fit lg:h-[42px] custom-font">
                {product.name}
              </h1>
              <span className="font-bold text-xl">${product.price}.00</span>
            </div>
            <button className="border bg-slate-100 hover:bg-slate-200 p-2 w-full rounded-sm mt-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "@/context/cartContext";
import products from "@/lib/data.json";
import { Product, CartContextType } from "@/types";

export default function Products() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Products must be used within a CartProvider");
  }

  const { cartItems, addToCart, removeFromCart } = context;

  // Helper function to get quantity of item in cart
  const getCartQuantity = (productName: string) => {
    const cartItem = cartItems.find((item) => item.name === productName);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-rose-900 mb-2">Desserts</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products && products.length > 0 ? (
          (products as Product[]).map((product: Product, index: number) => {
            const quantity = getCartQuantity(product.name);
            return (
              <div key={index} className="group">
                <div className="relative mb-4">
                  <Image
                    src={product.image.desktop}
                    alt={product.name}
                    width={300}
                    height={240}
                    className="w-full h-60 object-cover rounded-lg transition-all duration-200 group-hover:shadow-lg"
                  />

                  {quantity === 0 ? (
                    <Button
                      onClick={() => addToCart(product)}
                      className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white border-2 border-red-primary text-rose-900 hover:border-rose-500 cursor-pointer hover:scale-[1.1] hover:bg-red-primary hover:text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 shadow-md transition-all duration-200"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  ) : (
                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-red-primary text-white font-semibold px-4 py-2 rounded-full flex items-center gap-3 shadow-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeFromCart(
                            cartItems.find(
                              (item) => item.name === product.name
                            )!
                          )
                        }
                        className="p-1 hover:bg-white hover:text-black text-white border border-white/30 rounded-full"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="p-1 hover:bg-white hover:text-black text-white border border-white/30 rounded-full"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-rose-400 text-sm">{product.category}</p>
                  <h3 className="font-semibold text-rose-900">
                    {product.name}
                  </h3>
                  <p className="text-red-primary font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-8 text-center col-span-full">Loading products...</p>
        )}
      </div>
    </section>
  );
}

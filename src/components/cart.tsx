"use client";

import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { CartContext } from "@/context/cartContext";
import Image from "next/image";
import { CartProps } from "@/types";
import OrderConfirmationModal from "./OrderConfirmationModal";

export default function Cart({ toggle }: CartProps) {
  const context = useContext(CartContext);
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (!context) {
    throw new Error("Cart must be used within a CartProvider");
  }

  const { cartItems, removeFromCart, clearCart, getCartTotal } = context;

  const handleConfirmOrder = () => {
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    clearCart();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-red-primary mb-6">
        Your Cart ({cartItems.length})
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <Image
            src="/images/illustration-empty-cart.svg"
            alt="Empty cart"
            width={128}
            height={128}
            className="mx-auto mb-4"
          />
          <p className="text-rose-500">Your added items will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b border-rose-100 last:border-b-0"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-rose-900 text-sm mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-primary font-semibold">
                    {product.quantity}x
                  </span>
                  <span className="text-rose-400">
                    @ ${product.price.toFixed(2)}
                  </span>
                  <span className="text-rose-500 font-semibold">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromCart(product)}
                className="ml-2 p-1 hover:bg-rose-100 text-rose-400 hover:text-rose-600 border border-rose-300 rounded-full"
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-rose-900">Order Total</span>
              <span className="text-rose-900">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-rose-50 p-4 rounded-lg">
              <Image
                src="/images/icon-carbon-neutral.svg"
                alt="Carbon neutral"
                width={20}
                height={20}
              />
              <span className="text-sm text-rose-700">
                This is a <strong>carbon-neutral</strong> delivery
              </span>
            </div>

            <Button
              className="w-full bg-red-primary cursor-pointer hover:bg-red-primary/90 text-white font-semibold py-3 rounded-full"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      )}

      <OrderConfirmationModal
        isOpen={showOrderModal}
        onClose={handleCloseModal}
        cartItems={cartItems}
        total={getCartTotal()}
      />
    </div>
  );
}

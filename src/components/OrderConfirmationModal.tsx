"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { CartItem } from "@/types";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  cartItems,
  total,
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center mb-4">
          <CheckCircle className="text-green-600 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-rose-900">Order Confirmed</h2>
        </div>

        <p className="text-rose-500 mb-6">We hope you enjoy your food!</p>

        <div className="space-y-4 mb-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 pb-4 border-b border-rose-100 last:border-b-0"
            >
              <Image
                src={item.image.thumbnail}
                alt={item.name}
                width={50}
                height={50}
                className="rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-rose-900 text-sm">
                  {item.name}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-primary font-semibold">
                    {item.quantity}x
                  </span>
                  <span className="text-rose-400">
                    @ ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <span className="text-rose-900 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-lg font-bold mb-6 pt-4 border-t border-rose-100">
          <span className="text-rose-900">Order Total</span>
          <span className="text-rose-900">${total.toFixed(2)}</span>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-red-primary cursor-pointer hover:bg-red-primary/90 text-white font-semibold py-3 rounded-full"
        >
          Start New Order
        </Button>
      </div>
    </div>
  );
}

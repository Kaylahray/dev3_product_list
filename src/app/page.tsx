import Products from "@/components/products";
import Cart from "@/components/cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-rose-50">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:grid lg:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {/* Products Section */}
          <div className="lg:col-span-2 xl:col-span-3 mb-8 lg:mb-0">
            <Products />
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

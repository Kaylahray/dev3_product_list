// Product image interface
export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

// Base product interface
export interface Product {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

// Cart item interface (extends Product with quantity)
export interface CartItem extends Product {
  quantity: number;
}

// Cart context interface
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Cart provider props
export interface CartProviderProps {
  children: React.ReactNode;
}

// Cart component props
export interface CartProps {
  toggle?: () => void; // Made optional for sidebar layout
}

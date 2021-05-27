type Action = {
  type: string | any;
  payload?: Product | string | Array | any;
};

// Products
interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

type ProductState = {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string;
};

type ProductDispatch = (args: ProductAction) => ProductState;

// ================================================

// Cart

interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: string;
}
type CartState = {
  cartItems: CartItem[];
};

type CartDispatch = (args: Action) => CartState;

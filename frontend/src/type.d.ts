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

type ProductDispatch = (args: Action) => ProductState;

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

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

type CartState = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
};

type CartDispatch = (args: Action) => CartState;

// =================================================

// User Auth

interface UserInfo {
  refresh: string;
  access: string;
  id: number;
  _id: number;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}
type UserState = {
  userInfo: UserInfo;
  loading: boolean;
  error: string;
};

type UserDispatch = (args: Action) => UserState;

// User Details
interface UserDetails {
  id: number;
  _id: number;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

type UserDetailsState = {
  userDetails: UserDetails;
  loading: boolean;
  error: string;
};

type UserDetailsDispatch = (args: Action) => UserDetailsState;

// Order Create
interface Order {
  orderItems: CartItem[] | [];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

type OrderCreateState = {
  loading: boolean;
  success: boolean;
  order: Order[] | [] | null;
  error: string;
};

type OrderCreateDispatch = (args: Action) => OrderCreateState;

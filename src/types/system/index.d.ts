export interface Option {
    id: string; // Identificador único
    name: string; // Nombre del sabor o topping
    image: string; // Ruta de la imagen
    type: 'flavor' | 'topping'; // Categoría (sabor o topping)
  }
  

  export interface Articulo {
    name: string;
    price: number;
    amount: number;
  }


  
  // src/types/system.ts

// ——— Enums ———
export enum ProductType {
  REGULAR = 'REGULAR',
  SEASONAL = 'SEASONAL',
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  DISABLED = 'DISABLED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  READY_FOR_PICKUP = 'READY_FOR_PICKUP',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

// ——— Modelos ———
export interface Category {
  sortOrder?: number;
  id: string;
  name: string;
  accumulated:number?;
   status: ProductStatus;
  onCarousel: boolean;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  products?: Product[];
  createdAt: string; 
}

export interface OptionGroup {
  id: string;
  name: string;
  required: boolean;
  minSelectable: number;
  maxSelectable: number;
  productOptions?: ProductOption[];
  OptionValue?: OptionValue[];
  categoryId?: string;
  optionGroupIdToClone?:string;
  showImages?: boolean
}

export interface OptionValue {
  description(description: any): unknown;
  id: string;
  groupId: string;
  name: string;
  extraPrice: number;
  imageUrl: string;
  description:string?;
  ProductOptionValue?: ProductOptionValue[];
}

export interface Product {
  packOptionSurcharge?: number;
  isCustomizable?: boolean;
  packMaxItems?: number;
  hasRequiredOptions?: boolean;
  id: string;
  name: string;
  price: number;
  sellPrice?: number;
  specifications?: string;
  description?: string;
  imageLeft?: any;   // JSON: { url: string; blurHash?: string; }
  imageRight?: any;  // JSON: { url: string; blurHash?: string; }
  type: ProductType;
  status: ProductStatus;
  categoryId: string;
  category?: Category;
  options?: ProductOption[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  OrderItem?: OrderItem[];
}

export interface ProductOption {
  id: string;
  productId: string;
  groupId: string;
  product?: Product;
  group?: OptionGroup;
  values?: ProductOptionValue[];
}

export interface ProductOptionValue {
  id: string;
  productOptionId: string;
  valueId: string;
  productOption?: ProductOption;
  optionValue?: OptionValue;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  chosenOptions?: any; // JSON: detalles de opciones elegidas
  order?: Order;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  createdAt: string; // ISO date string
  totalAmount: number;
  subtotal: number;
  paymentMethod: string;
  stripePaymentIntentId: string;
  userId?: string;
  user?: User;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  specifications: string?;
  postalCode?:string;
  billingState?:string;
  billingCity:string;
  items?: OrderItem[];
}
export interface OrderCustomer  {
 resume: Resume 
}

interface Resume{
  count: number,
  average:number,
  totalSpent:number
}

export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
  role: Roles;
  orders?: Order[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Shared state store for admin dashboard
// In production, this would connect to a database

export type Product = {
  id: string
  title: string
  description: string
  price: number
  category: string
  sku: string
  img: string
  stock: number
  lowStockThreshold: number
  reorderPoint: number
  supplier: string
  compatiblePhones: string[]
  createdAt: string
  updatedAt: string
}

export type StockLog = {
  id: string
  productId: string
  productTitle: string
  previousStock: number
  newStock: number
  change: number
  reason: string
  changedBy: string
  timestamp: string
}

export type PhoneModel = {
  id: string
  brand: string
  model: string
  releaseYear: number
  isActive: boolean
}

export type StoreSettings = {
  storeName: string
  email: string
  phone: string
  whatsapp: string
  address: string
  currency: string
  lowStockAlertEnabled: boolean
  orderNotificationsEnabled: boolean
}

// Initial products data
export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "Clear Shield Tempered Glass (2-pack)",
    description:
      "High-quality tempered glass screen protector with 9H hardness rating. Crystal clear with anti-fingerprint coating.",
    price: 6500,
    category: "Screen Protectors",
    sku: "TS-GL-2",
    img: "/tempered-glass-screen-protector.jpg",
    stock: 150,
    lowStockThreshold: 20,
    reorderPoint: 50,
    supplier: "TechParts Nigeria Ltd",
    compatiblePhones: ["iphone-14", "iphone-14-pro", "iphone-13"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-11-20T14:30:00Z",
  },
  {
    id: "p2",
    title: "Slim Silicone Case - iPhone 14",
    description: "Ultra-thin silicone case with soft-touch finish. Provides excellent grip and drop protection.",
    price: 8500,
    category: "Cases",
    sku: "CASE-SL-IP14",
    img: "/silicone-phone-case.jpg",
    stock: 75,
    lowStockThreshold: 15,
    reorderPoint: 30,
    supplier: "CaseMart International",
    compatiblePhones: ["iphone-14"],
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-11-18T11:20:00Z",
  },
  {
    id: "p3",
    title: "FastCharge 20W USB-C Adapter",
    description: "Fast charging power adapter with USB-C port. Compatible with all USB-C devices.",
    price: 12000,
    category: "Chargers",
    sku: "FC-20W",
    img: "/usb-c-fast-charger.jpg",
    stock: 8,
    lowStockThreshold: 10,
    reorderPoint: 25,
    supplier: "PowerTech Solutions",
    compatiblePhones: [],
    createdAt: "2024-03-05T08:00:00Z",
    updatedAt: "2024-11-22T16:45:00Z",
  },
  {
    id: "p4",
    title: "Braided Lightning Cable - 1.5m",
    description: "Durable braided nylon cable with reinforced connectors. Fast data transfer and charging.",
    price: 5000,
    category: "Cables",
    sku: "CABL-LT-1_5",
    img: "/braided-lightning-cable.jpg",
    stock: 200,
    lowStockThreshold: 30,
    reorderPoint: 60,
    supplier: "CableWorld Nigeria",
    compatiblePhones: ["iphone-14", "iphone-14-pro", "iphone-13", "iphone-12"],
    createdAt: "2024-01-20T12:00:00Z",
    updatedAt: "2024-11-15T09:30:00Z",
  },
  {
    id: "p5",
    title: "MagSafe-Compatible Wallet",
    description: "Leather wallet with strong magnetic attachment. Holds up to 3 cards securely.",
    price: 15000,
    category: "Accessories",
    sku: "WLT-MG",
    img: "/magsafe-wallet.jpg",
    stock: 45,
    lowStockThreshold: 10,
    reorderPoint: 20,
    supplier: "AccessoryHub Lagos",
    compatiblePhones: ["iphone-14", "iphone-14-pro", "iphone-13", "iphone-12"],
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-11-21T13:15:00Z",
  },
]

export const initialPhoneModels: PhoneModel[] = [
  { id: "iphone-15-pro-max", brand: "Apple", model: "iPhone 15 Pro Max", releaseYear: 2023, isActive: true },
  { id: "iphone-15-pro", brand: "Apple", model: "iPhone 15 Pro", releaseYear: 2023, isActive: true },
  { id: "iphone-15", brand: "Apple", model: "iPhone 15", releaseYear: 2023, isActive: true },
  { id: "iphone-14-pro", brand: "Apple", model: "iPhone 14 Pro", releaseYear: 2022, isActive: true },
  { id: "iphone-14", brand: "Apple", model: "iPhone 14", releaseYear: 2022, isActive: true },
  { id: "iphone-13", brand: "Apple", model: "iPhone 13", releaseYear: 2021, isActive: true },
  { id: "iphone-12", brand: "Apple", model: "iPhone 12", releaseYear: 2020, isActive: true },
  { id: "samsung-s24-ultra", brand: "Samsung", model: "Galaxy S24 Ultra", releaseYear: 2024, isActive: true },
  { id: "samsung-s24", brand: "Samsung", model: "Galaxy S24", releaseYear: 2024, isActive: true },
  { id: "samsung-s23", brand: "Samsung", model: "Galaxy S23", releaseYear: 2023, isActive: true },
  { id: "samsung-a54", brand: "Samsung", model: "Galaxy A54", releaseYear: 2023, isActive: true },
  { id: "tecno-camon-20", brand: "Tecno", model: "Camon 20", releaseYear: 2023, isActive: true },
  { id: "tecno-spark-10", brand: "Tecno", model: "Spark 10", releaseYear: 2023, isActive: true },
  { id: "infinix-note-30", brand: "Infinix", model: "Note 30", releaseYear: 2023, isActive: true },
  { id: "infinix-hot-30", brand: "Infinix", model: "Hot 30", releaseYear: 2023, isActive: true },
  { id: "redmi-note-13", brand: "Xiaomi", model: "Redmi Note 13", releaseYear: 2024, isActive: true },
]

export const initialSettings: StoreSettings = {
  storeName: "Deloit Tech",
  email: "Ezenemebath@gmail.com",
  phone: "09060571455",
  whatsapp: "09060571455",
  address: "Lagos, Nigeria",
  currency: "NGN",
  lowStockAlertEnabled: true,
  orderNotificationsEnabled: true,
}

export const categories = [
  "Screen Protectors",
  "Cases",
  "Chargers",
  "Cables",
  "Accessories",
  "Earphones",
  "Power Banks",
  "Holders & Stands",
]

export interface MenuItem {
  id: string;
  name: string;
  tamilName?: string;
  description: string;
  category: "biryani" | "starters" | "veg" | "non-veg" | "meals" | "parotta" | "desserts";
  isSignature?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  price?: string;
  image: string;
  badge?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "all",
    name: "All Dishes",
    description: "Explore our complete kitchen selection.",
  },
  {
    id: "biryani",
    name: "Biryani",
    description: "Slow-cooked. Fragrant. Unforgettable.",
  },
  {
    id: "starters",
    name: "Starters",
    description: "Bold flavours to begin.",
  },
  {
    id: "veg",
    name: "Vegetarian",
    description: "Fresh. Comforting. Full of flavour.",
  },
  {
    id: "non-veg",
    name: "Non-Vegetarian",
    description: "Rich, hearty and unmistakably Tamil.",
  },
  {
    id: "meals",
    name: "Meals",
    description: "A complete plate. The way it should be.",
  },
  {
    id: "parotta",
    name: "Parotta",
    description: "Flaky outside. Soft inside.",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "End on a sweet note.",
  },
];

export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: "seeraga-samba-biryani",
    name: "Seeraga Samba Biryani",
    tamilName: "சீரக சம்பா பிரியாணி",
    description: "A Tamil classic, done our way.",
    category: "biryani",
    isSignature: true,
    isVeg: false,
    badge: "Heritage Special",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    tamilName: "சிக்கன் பிரியாணி",
    description: "Fragrant. Tender. Full of character.",
    category: "biryani",
    isSignature: true,
    isVeg: false,
    badge: "House Favorite",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    tamilName: "மட்டன் பிரியாணி",
    description: "Slow-cooked richness in every grain.",
    category: "biryani",
    isSignature: true,
    isVeg: false,
    badge: "Chef's Cut",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "mutton-meals",
    name: "Mutton Meals",
    tamilName: "மட்டன் சாப்பாடு",
    description: "A feast made for the table.",
    category: "meals",
    isSignature: true,
    isVeg: false,
    badge: "Banana Leaf Feast",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "chicken-meals",
    name: "Chicken Meals",
    tamilName: "சிக்கன் சாப்பாடு",
    description: "Comfort and spice on a traditional leaf.",
    category: "meals",
    isSignature: true,
    isVeg: false,
    badge: "Traditional Platter",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "kothu-parotta",
    name: "Parotta & Salna",
    tamilName: "பரோட்டா & சால்னா",
    description: "Made to tear. Made to share.",
    category: "parotta",
    isSignature: true,
    isVeg: false,
    badge: "Street-Style Craft",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
  },
];

export const ALL_MENU_ITEMS: MenuItem[] = [
  ...SIGNATURE_DISHES,
  {
    id: "chettinad-chicken-fry",
    name: "Chettinad Chicken Fry",
    tamilName: "செட்டிநாடு சிக்கன் வறுவல்",
    description: "Freshly roasted spices tossed in cast iron.",
    category: "starters",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "nethili-fish-fry",
    name: "Nethili Meen Varuval",
    tamilName: "நெத்திலி மீன் வறுவல்",
    description: "Crispy anchovies with coastal masala.",
    category: "starters",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "paneer-ghee-roast",
    name: "Paneer Ghee Roast",
    tamilName: "பன்னீர் நெய் வறுவல்",
    description: "Slow-roasted cottage cheese in aromatic Desi ghee.",
    category: "veg",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "mushroom-pepper-fry",
    name: "Kalan Milagu Varuval",
    tamilName: "காளான் மிளகு வறுவல்",
    description: "Tender button mushrooms crushed with black pepper.",
    category: "veg",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "mutton-sukka",
    name: "Mutton Chukka",
    tamilName: "மட்டன் சுக்கா",
    description: "Dry braised tender mutton with shallots & curry leaves.",
    category: "non-veg",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "nattu-kozhi-kulambu",
    name: "Nattu Kozhi Kulambu",
    tamilName: "நாட்டுக்கோழி குழம்பு",
    description: "Country chicken simmered in stone-ground village gravy.",
    category: "non-veg",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "traditional-veg-meals",
    name: "Samrajyam Veg Meals",
    tamilName: "சாம்பார் சாப்பாடு",
    description: "Rice, Sambar, Rasam, Kootu, Poriyal & Appalam on leaf.",
    category: "meals",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "bun-parotta",
    name: "Madurai Bun Parotta",
    tamilName: "பன் பரோட்டா",
    description: "Puffed, golden layered parotta served with spicy gravy.",
    category: "parotta",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "elaneer-payasam",
    name: "Elaneer Payasam",
    tamilName: "இளநீர் பாயாசம்",
    description: "Tender coconut flesh in chilled cardamom coconut milk.",
    category: "desserts",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "filter-coffee-mousse",
    name: "South Indian Filter Coffee",
    tamilName: "கும்பகோணம் டிகிரி காபி",
    description: "Frothy Kumbakonam degree decoction in traditional brass dabarah.",
    category: "desserts",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
  },
];

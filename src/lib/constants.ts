export interface SubCategory {
  label: string;
  value: string;
}

export interface MainCategory {
  label: string;
  value: string;
  subcategories: SubCategory[];
}

export const CATEGORY_STRUCTURE: MainCategory[] = [
  {
    label: "Men",
    value: "Men",
    subcategories: [
      { label: "Men's Shirts", value: "mens_shirts" },
      { label: "Men's Pants", value: "mens_pants" },
      { label: "Men's T-Shirts", value: "mens_tshirts" },
      { label: "Mundu", value: "mundu" },
    ],
  },
  {
    label: "Women",
    value: "Women",
    subcategories: [
      { label: "Sarees", value: "sarees" },
      { label: "Nighties", value: "nighties" },
      { label: "Churidar", value: "churidar" },
      { label: "Kurtis", value: "kurtis" },
    ],
  },
  {
    label: "Kids",
    value: "Kids",
    subcategories: [
      { label: "Girls Wear", value: "girls_wear" },
      { label: "Boys Wear", value: "boys_wear" },
      { label: "Baby Wear", value: "baby_wear" },
    ],
  },
];

export const CATEGORIES = CATEGORY_STRUCTURE.map(({ label, value }) => ({
  label,
  value,
}));

export const ALL_CATEGORIES = CATEGORY_STRUCTURE.flatMap(
  (cat) => cat.subcategories,
);


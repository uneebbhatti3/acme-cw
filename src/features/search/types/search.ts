export type SearchProduct = {
  type: "product";
  id: string;
  title: string;
  sku: string;
  category: string;
  description: string;
  availability: string;
  image: string;
  href: string;
};

export type SearchCategory = {
  type: "category";
  id: string;
  title: string;
  count: number;
  description: string;
  image: string;
  href: string;
};

export type SearchPage = {
  type: "page";
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

export type SearchResults = {
  products: SearchProduct[];
  categories: SearchCategory[];
  pages: SearchPage[];
};

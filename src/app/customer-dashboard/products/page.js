import ProductsDirectory from "./_components/ProductsDirectory";
import { fallbackCategories, fallbackListings, fallbackPopular } from "./_components/directoryData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getData(path, key, fallback) {
  if (!API_BASE_URL) return fallback;
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, { next: { revalidate: 300 } });
    if (!response.ok) return fallback;
    const data = await response.json();
    return data?.[key]?.length ? data[key] : fallback;
  } catch {
    return fallback;
  }
}

export default async function CustomerProductsPage() {
  const [categories, newListings, popularListings] = await Promise.all([
    getData("/category?type=business", "categories", fallbackCategories),
    getData("/business/new-listings", "businesses", fallbackListings),
    getData("/business/popular", "businesses", fallbackPopular),
  ]);

  return <ProductsDirectory categories={categories} newListings={newListings} popularListings={popularListings} />;
}

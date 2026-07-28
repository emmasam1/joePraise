import LandingPageClient from "@/components/LandingPageClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getPublicData(path, key) {
  if (!API_BASE_URL) return [];

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data?.[key] || [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const [publicCategories, newListings, popularListings] = await Promise.all([
    getPublicData("/category?type=business", "categories"),
    getPublicData("/business/new-listings", "businesses"),
    getPublicData("/business/popular", "businesses"),
  ]);

  return (
    <LandingPageClient
      publicCategories={publicCategories}
      newListings={newListings}
      popularListings={popularListings}
    />
  );
}

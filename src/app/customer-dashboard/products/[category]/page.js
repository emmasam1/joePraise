import CategoryResults from "../_components/CategoryResults";

export default async function CustomerCategoryPage({ params, searchParams }) {
  const { category } = await params;
  const query = await searchParams;

  return (
    <CategoryResults
      slug={decodeURIComponent(category)}
      initialLocation={typeof query.location === "string" ? query.location : ""}
      initialQuery={typeof query.q === "string" ? query.q : ""}
    />
  );
}

// JSON-LD block. Organization in the root layout; RealEstateListing on
// property pages. Values come from src/content only.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

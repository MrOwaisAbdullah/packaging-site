require('dotenv').config({ path: '.env.local' });
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function main() {
  const products = await client.fetch(`*[_type == "product" && category->slug.current in ["stretch-films", "bubble-wrap", "cotton-rolls", "boxes"]]{
    name,
    "categorySlug": category->slug.current,
    "imagesCount": count(images),
    "hasMainImage": defined(mainImage)
  }`);
  console.log("Bento products match:");
  console.log(JSON.stringify(products, null, 2));

  const allProducts = await client.fetch(`*[_type == "product"]{
    name,
    "categorySlug": category->slug.current
  }`);
  console.log("\nAll products categories:");
  console.log(JSON.stringify(allProducts.map(p => p.categorySlug), null, 2));
}

main().catch(console.error);

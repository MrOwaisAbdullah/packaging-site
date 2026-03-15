const { createClient } = require('next-sanity');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function findSlugs() {
  // We care about these 4 logical items
  const bentoItems = [
    { id: 'stretch-films', cat: 'films-wraps', search: 'stretch' },
    { id: 'bubble-wrap', cat: 'foams-boards', search: 'bubble' },
    { id: 'cotton-rolls', cat: 'foams-boards', search: 'cotton' },
    { id: 'boxes', cat: 'boxes-cartons', search: 'box' }
  ];

  const results = {};

  for (const item of bentoItems) {
    // Check if category exists
    const cat = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: item.cat });
    
    // Find representative product
    const product = await client.fetch(`*[_type == "product" && coalesce(active, true) == true && (category->slug.current == $cat || name.en match $search)][0]{ "slug": slug.current, "catSlug": category->slug.current }`, { cat: item.cat, search: `*${item.search}*` });

    results[item.id] = {
      categorySlug: cat?.slug?.current || item.cat,
      productSlug: product?.slug,
      productCatSlug: product?.catSlug
    };
  }

  console.log(JSON.stringify(results, null, 2));
}

findSlugs().catch(console.error);

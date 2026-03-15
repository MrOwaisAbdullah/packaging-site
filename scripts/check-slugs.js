const { createClient } = require('next-sanity');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkSlugs() {
  const query = `*[_type in ["product", "category"]]{
    _type,
    name,
    "slug": slug.current,
    "catSlug": category->slug.current
  }`;
  
  const results = await client.fetch(query);
  console.log(JSON.stringify(results, null, 2));
}

checkSlugs().catch(console.error);

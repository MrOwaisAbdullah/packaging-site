const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

const client = createClient({ projectId, dataset, apiVersion: '2024-03-09', token, useCdn: false })

// Rich product data keyed by slug
const enrichments = {
  // ═══════════════════ FILMS & WRAPS ═══════════════════
  'stretch-films': {
    description: `High-quality Stretch Film (also known as Stretch Wrap or Pallet Wrap) is a highly stretchable plastic film commonly made from Linear Low-Density Polyethylene (LLDPE). It is wrapped around items to secure them to each other and onto pallets for efficient transport and storage.\n\nOur stretch films provide superior puncture resistance, excellent cling, and high transparency. Available in both hand-grade and machine-grade variants to suit your specific packaging needs across Dubai and the UAE.`,
    specs: [
      { label: 'Material', value: 'High-Grade LLDPE' },
      { label: 'Type', value: 'Hand & Machine Grade' },
      { label: 'Width', value: '500mm / 450mm' },
      { label: 'Thickness', value: '17mic - 30mic' },
      { label: 'Elongation', value: 'Up to 300%' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'air-bubble-rolls': {
    description: `Air Bubble Rolls provide the perfect cushioning solution for fragile items. Featuring uniformly inflated bubbles, this wrap absorbs shocks and vibrations during transit. It is lightweight, moisture-resistant, and provides excellent surface protection for electronics, glassware, and industrial components.`,
    specs: [
      { label: 'Material', value: 'Low-Density Polyethylene (LDPE)' },
      { label: 'Bubble Diameter', value: '10mm / 25mm' },
      { label: 'Roll Width', value: '100cm / 120cm / 150cm' },
      { label: 'Roll Length', value: '100 Meters' },
      { label: 'Color', value: 'Clear / Transparent' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'black-stretch-film-wrap': {
    description: `Opaque Black Stretch Film offers the same high-performance as clear film but with added security and privacy. It conceals the contents of your pallets, deterring theft and protecting light-sensitive products from UV exposure. Perfect for high-value goods and warehouse organization.`,
    specs: [
      { label: 'Material', value: 'Tinted LLDPE' },
      { label: 'Color', value: 'Solid Black (Opaque)' },
      { label: 'Thickness', value: '23 Microns' },
      { label: 'Width', value: '500mm' },
      { label: 'Length', value: 'User-specified' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },

  // ═══════════════════ BOXES & CARTONS ═══════════════════
  'carton-boxes': {
    description: `Standard Corrugated Carton Boxes are the most versatile packaging solution. Our boxes are made from high-quality kraft paper, available in single-wall and double-wall configurations. They are ideal for moving, shipping, and storage.`,
    specs: [
      { label: 'Material', value: 'Recycled / Virgin Kraft Paper' },
      { label: 'Wall Type', value: '3-Ply (Single) / 5-Ply (Double)' },
      { label: 'Flute', value: 'B-Flute / C-Flute' },
      { label: 'Load Capacity', value: 'Up to 25kg' },
      { label: 'Customization', value: 'Available with Logo Printing' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'corrugated-box': {
    description: `Custom Corrugated Boxes and Sheet Rolls. We provide durable corrugated sheets for interleaving and heavy-duty boxes for industrial applications. Our products are designed to withstand high pressure and protect contents during long-distance shipping.`,
    specs: [
      { label: 'Material', value: 'Corrugated Cardboard' },
      { label: 'Type', value: 'Sheets & Boxes' },
      { label: 'Sturdiness', value: 'High ECT (Edge Crush Test)' },
      { label: 'Recyclability', value: '100% Recyclable' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'heavy-duty-boxes': {
    description: `Engineered for extreme durability, our Heavy Duty Boxes feature thick double-wall or triple-wall construction. These are specifically designed for heavy machinery parts, industrial equipment, and international export where maximum protection is non-negotiable.`,
    specs: [
      { label: 'Construction', value: '5-Ply / 7-Ply Heavy Duty' },
      { label: 'Bursting Strength', value: 'High (300+ PSI)' },
      { label: 'Application', value: 'Industrial / Export' },
      { label: 'Stacking Strength', value: 'Superior' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'die-cut-boxes': {
    description: `Precision-crafted Die Cut Boxes for a premium unboxing experience. These boxes are cut to exact shapes and dimensions, featuring self-locking mechanisms that require no tape. Perfect for retail packaging, gift boxes, and e-commerce shipping.`,
    specs: [
      { label: 'Design', value: 'Custom Die-Cut' },
      { label: 'Closure', value: 'Self-Locking / Tuck-In' },
      { label: 'Material', value: 'E-Flute / B-Flute' },
      { label: 'Printing', value: 'Optional Branding' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },

  // ═══════════════════ TAPES ═══════════════════
  'bopp-tapes': {
    description: `BOPP Adhesive Tapes are the industry standard for carton sealing. Our tapes feature a biaxially oriented polypropylene film coated with a strong acrylic adhesive. They provide a reliable seal in various temperature conditions, ensuring your packages stay closed during transit.`,
    specs: [
      { label: 'Material', value: 'Biaxially Oriented Polypropylene' },
      { label: 'Adhesive', value: 'Acrylic Water-Based' },
      { label: 'Width', value: '48mm / 72mm' },
      { label: 'Length', value: '66m / 100m' },
      { label: 'Colors', value: 'Clear / Brown' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'masking-tapes': {
    description: `High-quality Crepe Paper Masking Tape for painting, construction, and general-purpose bundling. It features an easy-to-tear backing and an adhesive that removes cleanly without leaving residue. Heat-resistant variants available for automotive applications.`,
    specs: [
      { label: 'Backing', value: 'Crepe Paper' },
      { label: 'Adhesive', value: 'Standard / High-Temp Rubber' },
      { label: 'Removability', value: 'Residue-Free Removal' },
      { label: 'Temp Resistance', value: 'Up to 80°C' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'duct-tape': {
    description: `Reinforced Duct Tape (Cloth Tape) for heavy-duty sealing, repairs, and bundling. This silver tape features a polyethylene-coated cloth backing and a powerful rubber adhesive. It is waterproof, strong, and conforms easily to irregular surfaces.`,
    specs: [
      { label: 'Material', value: 'PE-Coated Cloth' },
      { label: 'Adhesion', value: 'High-Strength Rubber' },
      { label: 'Color', value: 'Silver / Black' },
      { label: 'Features', value: 'Hand-Tearable / Waterproof' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'aluminum-tape': {
    description: `Aluminum Foil Tape is widely used in HVAC and construction for joint sealing and thermal insulation. It reflects heat and light, resists moisture, and maintains its bond in extreme temperatures. Perfect for ductwork and pipe insulation.`,
    specs: [
      { label: 'Material', value: 'Aluminum Foil' },
      { label: 'Adhesive', value: 'Acrylic (Heat Resistant)' },
      { label: 'Thickness', value: '30 - 50 Microns' },
      { label: 'Width', value: '48mm / 72mm' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'double-sided-tape': {
    description: `Double-Sided Tapes for mounting, splicing, and joining applications. Available in tissue, foam, and film carriers to suit different surface textures and bonding strengths. Used widely in arts, signage, and furniture industries.`,
    specs: [
      { label: 'Types', value: 'Tissue / Foam / PET' },
      { label: 'Adhesive', value: 'Acrylic / Solvent' },
      { label: 'Width', value: '6mm - 50mm' },
      { label: 'Application', value: 'Mounting / Joining' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'protection-tape': {
    description: `Surface Protection Tape (PE Film) guards sensitive surfaces from scratches, dust, and damage during fabrication or installation. Low-tack adhesive ensures a clean peel without affecting the underlying paint, glass, or metal.`,
    specs: [
      { label: 'Base Film', value: 'Polyethylene (PE)' },
      { label: 'Adhesion', value: 'Low-Tack / Easy Peel' },
      { label: 'Application', value: 'Glass / Metal / Plastic' },
      { label: 'Colors', value: 'Blue / Transparent' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },

  // ═══════════════════ STRAPS & ACCESSORIES ═══════════════════
  'pp-straps': {
    description: `Polypropylene (PP) Straps are a cost-effective solution for bundling and palletizing light to medium loads. Our straps offer high elongation and great tension recovery. Compatible with manual tools and semi-automatic strapping machines.`,
    specs: [
      { label: 'Material', value: 'Polypropylene' },
      { label: 'Width', value: '9mm / 12mm / 15mm' },
      { label: 'Thickness', value: '0.6mm - 0.9mm' },
      { label: 'Core Size', value: '200mm / 400mm' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'pet-strap': {
    description: `Polyester (PET) Strapping is the strongest plastic strapping, making it a viable alternative to steel. It maintains high tension over long periods and absorbs impacts without breaking. Ideal for heavy-duty industrial loads.`,
    specs: [
      { label: 'Material', value: 'Polyester' },
      { label: 'Breaking Strength', value: 'High (up to 800kg)' },
      { label: 'Surface', value: 'Smooth / Embossed' },
      { label: 'Color', value: 'Dark Green' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'clips-and-buckles': {
    description: `Essential accessories for strapping systems. We provide galvanized steel clips and plastic buckles that ensure a secure hold. Compatible with custom strap widths to prevent slipping and load loosening.`,
    specs: [
      { label: 'Material', value: 'Galvanized Steel / Plastic' },
      { label: 'Widths', value: '12mm / 15mm / 19mm' },
      { label: 'Quantity', value: 'Bulk Packs' },
      { label: 'Type', value: 'Open / Closed Seals / Buckles' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },

  // ═══════════════════ FOAMS & BOARDS ═══════════════════
  'pe-foam-sheets': {
    description: `PE Foam (Polyethylene Foam) Sheets are lightweight, closed-cell cushioning materials. They provide non-abrasive protection for delicate surfaces and are moisture-resistant. Perfect for wrapping glassware, electronics, and polished furniture.`,
    specs: [
      { label: 'Material', value: 'Expanded Polyethylene' },
      { label: 'Thickness', value: '1mm - 50mm' },
      { label: 'Density', value: '25kg/m³ - 35kg/m³' },
      { label: 'Format', value: 'Rolls / Sheets / Pouches' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'polyethylene-foam': {
    description: `General Purpose Polyethylene Foam for high-performance cushioning and insulation. Our EPE foam products are chemically inert, moisture-resistant, and 100% recyclable. Widely used across industrial packaging and construction.`,
    specs: [
      { label: 'Chemical Type', value: 'Non-Crosslinked PE' },
      { label: 'Features', value: 'Resilient / Shock Absorbent' },
      { label: 'Eco-Friendly', value: '100% Recyclable' },
      { label: 'Colors', value: 'White / Black' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },

  // ═══════════════════ SAFETY & GLOVES ═══════════════════
  'cotton-gloves': {
    description: `Breathable and comfortable Knitted Cotton Gloves for light-duty work and handling. They protect products from fingerprints and provide a better grip. Ideal for electronics assembly, inspection, and warehouse tasks.`,
    specs: [
      { label: 'Material', value: 'Cotton / Polyester Blend' },
      { label: 'Type', value: 'Knitted' },
      { label: 'Weight', value: '40g - 70g' },
      { label: 'Sizes', value: 'Standard Men / Women' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
  'nitrile-gloves': {
    description: `High-quality disposable Nitrile Gloves for superior chemical and puncture resistance compared to latex. These are latex-free and powder-free, making them safe for sensitive skin. Widely used in healthcare, food service, and industrial cleaning.`,
    specs: [
      { label: 'Material', value: 'Synthetic Nitrile Rubber' },
      { label: 'Features', value: 'Latex-Free / Powder-Free' },
      { label: 'Size', value: 'S / M / L / XL' },
      { label: 'Compliance', value: 'Medical / Food Grade' },
      { label: 'Brand', value: 'Next Level Packaging' },
    ]
  },
}

// Fallback logic for descriptive and technical specs if not explicitly listed above
function getFallbackData(product) {
  return {
    description: `Premium quality ${product.name?.en || 'packaging product'} manufactured by Next Level Packaging. Designed for durability and efficiency in the UAE industrial and retail sectors. Part of our comprehensive range of high-performance packaging materials.`,
    specs: [
      { label: 'Brand', value: 'Next Level Packaging' },
      { label: 'Origin', value: 'UAE / Distributed' },
      { label: 'Condition', value: 'New / Quality Tested' },
      { label: 'Availablity', value: 'In Stock / Custom Orders' }
    ]
  }
}

async function enrichProducts() {
  console.log('📝 Fetching all products from Sanity...\n')
  const products = await client.fetch(`*[_type == "product"]{_id, "slug": slug.current, name}`)
  
  console.log(`Found ${products.length} products. Enriching...\n`)
  
  let updated = 0
  let skipped = 0

  for (const product of products) {
    const data = enrichments[product.slug] || getFallbackData(product)
    
    const specs = data.specs.map((s, i) => ({
      _key: `spec${i+1}-${Date.now()}`,
      _type: 'spec',
      label: s.label,
      value: s.value,
    }))

    try {
      await client
        .patch(product._id)
        .set({
          description: { en: data.description },
          specifications: specs,
        })
        .commit()
      
      console.log(`✅ Enriched: ${product.name?.en} (${product.slug})`)
      updated++
    } catch (err) {
      console.error(`❌ Error updating ${product.name?.en}:`, err.message)
    }
  }

  console.log(`\n🎉 Done! Updated ${updated} products.`)
}

enrichProducts().catch(console.error)

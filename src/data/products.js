const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=95&dpr=2`;

const imageTheme = {
  "Indian Kurties": ["fff8e8", "8a641f"],
  Earrings: ["fffefa", "8a641f"],
  "Ethnic Wear": ["fff8e8", "8a641f"],
  Accessories: ["fffefa", "8a641f"],
  Bangles: ["fff8e8", "8a641f"],
  Dupattas: ["fffefa", "8a641f"],
  Handbags: ["fff8e8", "8a641f"],
  Watches: ["fffefa", "8a641f"],
  "Beauty Gift Sets": ["fff8e8", "8a641f"],
  Gifts: ["fffefa", "8a641f"],
  "Girls Fashion": ["fff8e8", "8a641f"],
};

const placeholderImage = (product, variant = "Product") => {
  const [background, color] = imageTheme[product.category] || ["f7f5f2", "2b2527"];
  const label = encodeURIComponent(`${product.category}\n${variant}`);
  return `https://placehold.co/900x1125/${background}/${color}.png?text=${label}&font=montserrat`;
};

const galleryImages = [
  "photo-1583391733956-6c78276477e2",
  "photo-1610030469983-98e550d6193c",
  "photo-1603217040830-34473db521a6",
  "photo-1515562141207-7a88fb7ce338",
  "photo-1590874103328-eac38a683ce7",
  "photo-1524592094714-0f0654e20314",
  "photo-1598440947619-2c35fc9aa908",
  "photo-1549465220-1a8b9238cd48",
  "photo-1606760227091-3dd870d97f1d",
  "photo-1599643478518-a784e5dc4c8f",
  "photo-1622122201714-77da0ca8e5d2",
  "photo-1603974372039-adc49044b6bd",
];

const detailIntros = [
  "Designed for women who like polished ethnic pieces that stay comfortable through a long day.",
  "A refined pick for festive plans, family visits, college looks, and easy gifting.",
  "Made to bring a finished AryaShop look together without feeling over-styled.",
  "Curated for shoppers who want Indian fashion with modern ease and wearable details.",
];

const baseProducts = [
  { id: 1, name: "Aarohi Floral Cotton Kurti", category: "Indian Kurties", originalPrice: 1899, price: 1199, offer: "37% OFF", image: img("photo-1583391733956-6c78276477e2"), description: "A soft daily-wear kurti with graceful floral print and straight fit styling.", material: "Pure cotton, calf length, three-quarter sleeves" },
  { id: 2, name: "Meera Rayon A-Line Kurti", category: "Indian Kurties", originalPrice: 1699, price: 999, offer: "Best Seller", image: img("photo-1610030469983-98e550d6193c"), description: "Easy festive dressing with a breezy A-line fall and subtle neckline detail.", material: "Rayon blend, machine washable, relaxed fit" },
  { id: 3, name: "Noor Chikankari Kurti", category: "Indian Kurties", originalPrice: 2499, price: 1599, offer: "36% OFF", image: img("photo-1610173827002-62c0f1f05d04"), description: "Elegant chikankari-inspired thread work for office, college, and light occasions.", material: "Cotton viscose, embroidered front, side slits" },
  { id: 4, name: "Sitara Festive Anarkali", category: "Ethnic Wear", originalPrice: 3999, price: 2799, offer: "30% OFF", image: img("photo-1603217040830-34473db521a6"), description: "A graceful flare silhouette designed for family gatherings and festive evenings.", material: "Georgette blend, lining attached, round neck" },
  { id: 5, name: "Gulzar Printed Kurta Set", category: "Ethnic Wear", originalPrice: 3299, price: 2199, offer: "New", image: img("photo-1597983073493-88cd35cf93b0"), description: "A polished kurta set with printed trousers for coordinated everyday styling.", material: "Cotton blend kurta and pants, breathable weave" },
  { id: 6, name: "Kashvi Silk Blend Suit Set", category: "Ethnic Wear", originalPrice: 4599, price: 3199, offer: "30% OFF", image: img("photo-1603344797033-f0f4f587ab60"), description: "A refined silk blend suit set with festive shine and lightweight comfort.", material: "Silk blend, includes kurta, bottom, dupatta" },
  { id: 7, name: "Tara Kundan Drop Earrings", category: "Earrings", originalPrice: 899, price: 549, offer: "39% OFF", image: img("photo-1515562141207-7a88fb7ce338"), description: "Classic kundan-style drops that pair beautifully with sarees and kurtas.", material: "Gold-toned alloy, faux kundan stones, push-back closure" },
  { id: 8, name: "Riwa Pearl Hoop Earrings", category: "Earrings", originalPrice: 799, price: 499, offer: "Limited Deal", image: img("photo-1535632066927-ab7c9ab60908"), description: "Minimal pearl hoops for workwear, brunch, and light festive looks.", material: "Alloy base, imitation pearls, nickel-safe finish" },
  { id: 9, name: "Zoya Oxidised Jhumkas", category: "Earrings", originalPrice: 699, price: 399, offer: "43% OFF", image: img("photo-1617038260897-41a1f14a8ca0"), description: "Statement oxidised jhumkas with a handcrafted-inspired finish.", material: "Oxidised alloy, fish-hook closure, lightweight" },
  { id: 10, name: "Ira Stone Stud Earrings", category: "Earrings", originalPrice: 599, price: 349, offer: "", image: img("photo-1506630448388-4e683c67ddb0"), description: "Simple stone studs made for everyday sparkle without feeling heavy.", material: "Alloy, glass stones, secure push-back" },
  { id: 11, name: "Pihu Charm Bracelet", category: "Accessories", originalPrice: 999, price: 649, offer: "35% OFF", image: img("photo-1611591437281-460bfbe1220a"), description: "A delicate charm bracelet to layer with watches and bangles.", material: "Stainless steel, adjustable chain, polished finish" },
  { id: 12, name: "Amaya Silk Scrunchie Set", category: "Accessories", originalPrice: 499, price: 299, offer: "Combo", image: img("photo-1596462502278-27bfdc403348"), description: "Soft hair scrunchies in festive shades for gentle, everyday styling.", material: "Satin silk feel, pack of 4, elastic core" },
  { id: 13, name: "Rangoli Enamel Bangles", category: "Bangles", originalPrice: 1299, price: 799, offer: "38% OFF", image: img("photo-1606760227091-3dd870d97f1d"), description: "Colorful enamel bangles that bring a festive accent to simple outfits.", material: "Metal alloy, enamel coating, set of 12" },
  { id: 14, name: "Kavya Gold Plated Kada", category: "Bangles", originalPrice: 1499, price: 899, offer: "40% OFF", image: img("photo-1617038220319-276d3cfab638"), description: "A polished kada with etched detailing for wedding and festive styling.", material: "Gold-plated alloy, openable clasp, anti-tarnish coating" },
  { id: 15, name: "Mogra Glass Bangle Set", category: "Bangles", originalPrice: 899, price: 549, offer: "", image: img("photo-1630019852942-f89202989a59"), description: "Traditional glass bangles in soft mixed shades for ethnic wear.", material: "Glass, assorted sizes, set of 24" },
  { id: 16, name: "Saheli Printed Dupatta", category: "Dupattas", originalPrice: 999, price: 599, offer: "40% OFF", image: img("photo-1583391733981-24c0b1f06175"), description: "A lightweight printed dupatta to refresh plain kurtas and suit sets.", material: "Cotton mulmul, tassel edges, floral print" },
  { id: 17, name: "Mehr Banarasi Dupatta", category: "Dupattas", originalPrice: 1899, price: 1299, offer: "Festive Pick", image: img("photo-1604605801370-3396f9bd9e8a"), description: "Rich Banarasi-inspired texture with a subtle sheen for festive occasions.", material: "Silk blend, woven border, zari-style pattern" },
  { id: 18, name: "Leher Chiffon Dupatta", category: "Dupattas", originalPrice: 799, price: 499, offer: "", image: img("photo-1591178761188-885caa0b2a64"), description: "Soft chiffon dupatta with easy drape and elegant fall.", material: "Chiffon, solid color, rolled edges" },
  { id: 19, name: "Naina Embroidered Handbag", category: "Handbags", originalPrice: 2499, price: 1699, offer: "32% OFF", image: img("photo-1584917865442-de89df76afd3"), description: "A compact embroidered handbag for festive outings and dinner plans.", material: "Vegan leather, embroidered flap, chain strap" },
  { id: 20, name: "Avni Everyday Tote", category: "Handbags", originalPrice: 2199, price: 1399, offer: "36% OFF", image: img("photo-1590874103328-eac38a683ce7"), description: "A roomy tote with a clean shape for work, college, and shopping days.", material: "Vegan leather, inner zipper pocket, shoulder handles" },
  { id: 21, name: "Kiara Mini Sling Bag", category: "Handbags", originalPrice: 1599, price: 999, offer: "38% OFF", image: img("photo-1548036328-c9fa89d128fa"), description: "A neat sling bag with enough space for essentials and a phone.", material: "PU leather, adjustable strap, magnetic closure" },
  { id: 22, name: "Anika Rose Gold Watch", category: "Watches", originalPrice: 2799, price: 1899, offer: "32% OFF", image: img("photo-1524592094714-0f0654e20314"), description: "A polished rose gold watch for refined everyday accessorising.", material: "Stainless steel case, quartz movement, metal strap" },
  { id: 23, name: "Sana Minimal Dial Watch", category: "Watches", originalPrice: 2499, price: 1599, offer: "", image: img("photo-1523275335684-37898b6baf30"), description: "Clean dial styling that works easily with western and ethnic outfits.", material: "Quartz movement, faux leather strap, water-resistant finish" },
  { id: 24, name: "Diya Bracelet Watch", category: "Watches", originalPrice: 3199, price: 2199, offer: "31% OFF", image: img("photo-1508685096489-7aacd43bd3b1"), description: "A jewellery-inspired watch with a bracelet strap and slim case.", material: "Alloy bracelet strap, quartz movement, decorative bezel" },
  { id: 25, name: "Ruhani Beauty Gift Set", category: "Beauty Gift Sets", originalPrice: 1999, price: 1299, offer: "Gift Ready", image: img("photo-1596462502278-27bfdc403348"), description: "A thoughtful beauty gift set curated for birthdays and festive gifting.", material: "Includes lip tint, compact pouch, mini mirror, fragrance mist" },
  { id: 26, name: "Aroma Self-Care Hamper", category: "Beauty Gift Sets", originalPrice: 2599, price: 1799, offer: "31% OFF", image: img("photo-1598440947619-2c35fc9aa908"), description: "A relaxing self-care hamper with beauty essentials and soothing notes.", material: "Body lotion, soap bar, candle, bath salts" },
  { id: 27, name: "Glow Mini Makeup Kit", category: "Beauty Gift Sets", originalPrice: 2299, price: 1499, offer: "35% OFF", image: img("photo-1522335789203-aabd1fc54bc9"), description: "Compact makeup essentials packed for travel, gifting, or first kits.", material: "Blush, lip shade, kajal, travel pouch" },
  { id: 28, name: "Misha Floral Gift Box", category: "Gifts", originalPrice: 1799, price: 1099, offer: "39% OFF", image: img("photo-1513885535751-8b9238bd345a"), description: "A charming gift box for sisters, friends, and bridesmaids.", material: "Scarf, earrings, note card, keepsake box" },
  { id: 29, name: "Bride Tribe Accessory Box", category: "Gifts", originalPrice: 2999, price: 2099, offer: "Wedding Pick", image: img("photo-1513201099705-a9746e1e201f"), description: "Curated accessories designed for wedding celebrations and bridal squads.", material: "Hair clips, earrings, bracelet, potli pouch" },
  { id: 30, name: "Sakhi Festive Gift Hamper", category: "Gifts", originalPrice: 3499, price: 2399, offer: "31% OFF", image: img("photo-1549465220-1a8b9238cd48"), description: "A complete festive hamper with wearable accessories and keepsakes.", material: "Dupatta, bangles, earrings, decorative box" },
  { id: 31, name: "Lavanya Potli Bag", category: "Handbags", originalPrice: 1399, price: 849, offer: "39% OFF", image: img("photo-1605733513597-a8f8341084e6"), description: "Traditional potli styling for lehengas, sarees, and festive suits.", material: "Brocade fabric, drawstring closure, pearl handle" },
  { id: 32, name: "Afsana Mirror Work Clutch", category: "Handbags", originalPrice: 1899, price: 1199, offer: "", image: img("photo-1566150905458-1bf1fc113f0d"), description: "A mirror-work clutch with a festive profile and compact storage.", material: "Fabric exterior, mirror embellishment, detachable chain" },
  { id: 33, name: "Jiya Cotton Palazzo Pants", category: "Ethnic Wear", originalPrice: 1299, price: 799, offer: "38% OFF", image: img("photo-1541099649105-f69ad21f3246"), description: "Comfortable palazzo pants made to pair with kurtis and short tops.", material: "Cotton, elasticated waist, wide-leg cut" },
  { id: 34, name: "Roop Ethnic Skirt", category: "Ethnic Wear", originalPrice: 2299, price: 1499, offer: "35% OFF", image: img("photo-1583496661160-fb5886a13d27"), description: "A twirl-friendly ethnic skirt with understated prints and an easy waistband.", material: "Cotton blend, flared silhouette, side zip" },
  { id: 35, name: "Aashi Beaded Necklace", category: "Accessories", originalPrice: 1199, price: 749, offer: "", image: img("photo-1599643478518-a784e5dc4c8f"), description: "A delicate beaded necklace for layered everyday looks.", material: "Glass beads, alloy chain, adjustable clasp" },
  { id: 36, name: "Rhea Hair Clip Set", category: "Accessories", originalPrice: 599, price: 349, offer: "Set of 6", image: img("photo-1573575155376-b5010099301b"), description: "Chic clips for half-up styles, buns, and quick festive touch-ups.", material: "Acrylic and alloy clips, mixed designs" },
  { id: 37, name: "Sunehri Anklet Pair", category: "Accessories", originalPrice: 799, price: 499, offer: "38% OFF", image: img("photo-1605100804763-247f67b3557e"), description: "Subtle anklets that bring a traditional accent to everyday styling.", material: "Gold-toned alloy, adjustable chain, pair of 2" },
  { id: 38, name: "Pari Kids Ethnic Frock", category: "Girls Fashion", originalPrice: 2199, price: 1399, offer: "36% OFF", image: img("photo-1519238263530-99bdd11df2ea"), description: "A festive ethnic frock for girls with soft lining and playful flair.", material: "Cotton silk blend, inner lining, back zip" },
  { id: 39, name: "Mitti Girls Kurti Set", category: "Girls Fashion", originalPrice: 1799, price: 1099, offer: "39% OFF", image: img("photo-1503454537195-1dcabb73ffb9"), description: "A comfortable kurti set for girls in cheerful traditional prints.", material: "Cotton blend, kurti and leggings, gentle seams" },
  { id: 40, name: "Gudiya Hair Accessory Kit", category: "Girls Fashion", originalPrice: 699, price: 429, offer: "Combo", image: img("photo-1550639525-c97d455acf70"), description: "Colorful clips and bands for girls' party and festive hairstyles.", material: "Mixed hair bands, bow clips, storage pouch" },
  { id: 41, name: "Ishika Modal Kurti", category: "Indian Kurties", originalPrice: 1999, price: 1299, offer: "35% OFF", image: img("photo-1622122201714-77da0ca8e5d2"), description: "Soft modal fabric with a graceful print and relaxed day-long comfort.", material: "Modal blend, straight fit, breathable finish" },
  { id: 42, name: "Pankhuri Short Kurti", category: "Indian Kurties", originalPrice: 1499, price: 899, offer: "", image: img("photo-1568252542512-9fe8fe9c87bb"), description: "A versatile short kurti for denim, palazzos, and casual office looks.", material: "Cotton rayon, button placket, hip length" },
  { id: 43, name: "Leela Rayon Co-ord Set", category: "Ethnic Wear", originalPrice: 3599, price: 2399, offer: "33% OFF", image: img("photo-1485968579580-b6d095142e6e"), description: "A smart ethnic co-ord with comfort-led tailoring and polished print work.", material: "Rayon blend top and pants, relaxed silhouette" },
  { id: 44, name: "Chand Silver Jhumka", category: "Earrings", originalPrice: 999, price: 629, offer: "37% OFF", image: img("photo-1601121141461-9d6647bca1ed"), description: "Silver-toned jhumkas with classic ethnic detailing and easy wearability.", material: "Oxidised alloy, bell drop, hook closure" },
  { id: 45, name: "Veda Temple Earrings", category: "Earrings", originalPrice: 1299, price: 849, offer: "35% OFF", image: img("photo-1603974372039-adc49044b6bd"), description: "Temple-inspired earrings designed for saree and lehenga pairings.", material: "Antique gold alloy, carved motif, push-back closure" },
  { id: 46, name: "Neer Cotton Stole", category: "Dupattas", originalPrice: 799, price: 449, offer: "44% OFF", image: img("photo-1520903920243-00d872a2d1c9"), description: "A soft stole for light layering with kurtas and western basics.", material: "Cotton, printed border, lightweight drape" },
  { id: 47, name: "Maya Pearl Bangle Set", category: "Bangles", originalPrice: 1599, price: 999, offer: "38% OFF", image: img("photo-1620656798579-1984d9e87df2"), description: "Pearl-accented bangles with a delicate festive finish.", material: "Alloy and imitation pearls, set of 8" },
  { id: 48, name: "Nitya Office Handbag", category: "Handbags", originalPrice: 2899, price: 1999, offer: "31% OFF", image: img("photo-1594223274512-ad4803739b7c"), description: "Structured handbag with practical compartments for work essentials.", material: "Vegan leather, zip sections, short and long handles" },
  { id: 49, name: "Ahaana Gift Card Holder", category: "Gifts", originalPrice: 899, price: 549, offer: "", image: img("photo-1607344645866-009c320b63e0"), description: "A small premium holder for gifting cards, notes, and jewellery tokens.", material: "Vegan leather, snap button, compact profile" },
  { id: 50, name: "Sia Festive Watch Set", category: "Watches", originalPrice: 3799, price: 2599, offer: "32% OFF", image: img("photo-1612817159949-195b6eb9e31a"), description: "A watch and bracelet set created for gifting and occasion dressing.", material: "Quartz watch, bracelet pair, presentation box" },
];

export const products = baseProducts.map((product, index) => {
  const primaryImage = placeholderImage(product, product.name.split(" ").slice(0, 2).join(" "));
  const gallery = [
    product.image,
    img(galleryImages[index % galleryImages.length]),
    img(galleryImages[(index + 3) % galleryImages.length]),
    img(galleryImages[(index + 6) % galleryImages.length]),
  ];

  return {
    ...product,
    image: product.image,
    fallbackImage: primaryImage,
    images: gallery,
    fallbackImages: [
      primaryImage,
      placeholderImage(product, "Front View"),
      placeholderImage(product, "Detail View"),
      placeholderImage(product, "Styled View"),
    ],
    shortDescription: product.description,
    longDescription: `${detailIntros[index % detailIntros.length]} ${product.description} The piece is selected for AryaShop.com shoppers who prefer clear styling, useful details, and an easy WhatsApp inquiry before ordering. Pair it with neutral basics for daily wear or add jewellery and a matching dupatta for a more dressed-up Indian fashion moment.`,
    highlights: [
      "Curated by AryaShop.com for Indian fashion shoppers",
      "Easy WhatsApp inquiry before buying",
      "Comfort-focused styling for repeated wear",
      product.material,
    ],
    shipping: "Ships from AryaShop.com partner inventory in 3-6 working days. Delivery timeline is demo text for this frontend-only website.",
    rating: Number((4.2 + ((index % 8) * 0.08)).toFixed(1)),
    reviews: 38 + index * 7,
  };
});

export const categories = [...new Set(products.map((product) => product.category))];

export const featuredProducts = products.filter((product) => [1, 7, 17, 20, 25, 31, 41, 50].includes(product.id));

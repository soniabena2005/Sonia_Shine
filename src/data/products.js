const img = (name) => `/products/${name}.jpg`;

export const products = [
  { id: 1, name: "Evil Eye Necklace", category: "Necklaces", price: 600, image: img("evil-eye-necklace"), desc: "A fine gold chain with a small blue evil-eye charm." },
  { id: 2, name: "Layered Necklace Trio", category: "Necklaces", price: 1500, image: img("layered-necklaces"), desc: "Three chains to wear together, finished with a sparkling stone." },
  { id: 11, name: "Sun Pendant Necklace", category: "Necklaces", price: 700, image: img("sun-necklace"), desc: "A swirling sun pendant on a smooth snake chain." },
  { id: 3, name: "Clover Earrings", category: "Earrings", price: 200, image: img("clover-earrings"), desc: "Clover-shaped earrings with a fine engraved sunburst." },
  { id: 8, name: "Textured Gold Hoops", category: "Earrings", price: 300, image: img("item-300"), desc: "Chunky hoops with a light-catching textured finish." },
  { id: 4, name: "Crystal Hoop Earrings", category: "Earrings", price: 500, image: img("crystal-hoops"), desc: "Classic gold hoops with a band of sparkling crystals." },
  { id: 9, name: "Heart Set", category: "Sets", price: 1200, image: img("heart-set"), desc: "Matching heart necklace, bracelet and earrings." },
  { id: 6, name: "Seashell Charm Bracelet", category: "Bracelets", price: 800, image: img("charm-bracelet"), desc: "Gold chain bracelet with shells, a turtle and a starfish." },
  { id: 7, name: "Flower Cuff Bracelet", category: "Bracelets", price: 800, image: img("flower-cuff"), desc: "An open cuff made of engraved gold flowers." },
  { id: 5, name: "Chunky Bangle Set", category: "Bracelets", price: 1900, image: img("bangle-set"), desc: "Four bold bangles in gold, marble and amber tones." },
  { id: 12, name: "Stackable Ring Set", category: "Rings", price: 600, image: img("ring-set"), desc: "Six adjustable rings in different textures, made to be stacked." },
  { id: 10, name: "Oval Bangle Watch", category: "Watches", price: 3000, image: img("oval-bangle-watch"), desc: "An oval dial with Roman numerals on a gold bangle." },
  { id: 14, name: "Leather Strap Watch Duo", category: "Watches", price: 1800, image: img("leather-watches"), desc: "Two oval watches, one with a black strap and one with a brown strap." },
  { id: 15, name: "Gold Chain Watch", category: "Watches", price: 1800, image: img("chain-watch"), desc: "A slim oval watch on a gold link bracelet." },
  { id: 16, name: "Watch and Bracelet Duo", category: "Watches", price: 2000, image: img("watch-bracelet"), desc: "A gold watch with a matching sequin chain bracelet." },
  { id: 13, name: "Padded Headband Set", category: "Hair", price: 1000, image: img("headbands"), desc: "Four soft padded headbands in black, brown, beige and ivory." },
];

export const categories = ["All", ...new Set(products.map((p) => p.category))];
export const formatPrice = (n) => n.toLocaleString("fr-FR") + " DA";

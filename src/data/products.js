import { supabase } from '../lib/supabaseClient.js';

export const GROUPS = ['Mujer', 'Hombre', 'Niños'];

export const COLORS = [
  { name: 'Crema', hex: '#EFE4D2' },
  { name: 'Terracota', hex: '#C4714C' },
  { name: 'Verde oliva', hex: '#6F7A53' },
  { name: 'Azul noche', hex: '#3A4763' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
export const KID_SIZES = ['2A', '4A', '6A', '8A', '10A'];

// Live catalog, fetched from Supabase (managed by the admin panel at
// ../../tiendaropasakuadmin). Starts empty; loadCatalog() fills it in before
// StoreProvider renders the app — see productsReady in store/StoreContext.jsx.
// Exported as a mutable binding (not a snapshot) so byGroup/findProduct below
// always read the current catalog, and so components that import
// ALL_PRODUCTS directly see the fetched data once productsReady flips true
// and React re-renders them.
export let ALL_PRODUCTS = [];

function publicUrlFor(storagePath) {
  return supabase.storage.from('product-images').getPublicUrl(storagePath).data.publicUrl;
}

function normalize(row) {
  const images = (row.product_images || [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((img) => publicUrlFor(img.storage_path));
  return {
    id: row.id,
    group: row.group_name,
    name: row.name,
    price: Number(row.price),
    was: row.was != null ? Number(row.was) : undefined,
    cat: row.cat,
    tag: row.tag || undefined,
    fabric: row.fabric || undefined,
    desc: row.description || undefined,
    exclusiveUntil: row.exclusive_until || undefined,
    images, // uploaded via the admin panel — [] until a photo exists
  };
}

export async function loadCatalog() {
  if (!supabase) return ALL_PRODUCTS; // not configured — storefront shows an empty catalog
  const { data, error } = await supabase
    .from('products')
    .select('id, group_name, name, price, was, cat, tag, fabric, description, exclusive_until, product_images(storage_path, position)')
    .order('created_at', { ascending: true });
  if (error) throw error;
  ALL_PRODUCTS = data.map(normalize);
  return ALL_PRODUCTS;
}

export function byGroup(g) {
  return ALL_PRODUCTS.filter((p) => p.group === g);
}

export function findProduct(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || null;
}

export function sizesFor(product) {
  return product && product.group === 'Niños' ? KID_SIZES : SIZES;
}

export function isExclusive(product) {
  return !!(product && product.exclusiveUntil);
}

import { supabase } from './supabaseClient.js';
import { compressImage } from './imageCompression.js';

const BUCKET = 'product-images';

function publicUrlFor(storagePath) {
  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado (faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en .env.local).');
  }
}

// Public — used by the storefront to render a product's gallery.
export async function getProductImages(productId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('product_images')
    .select('id, storage_path, position')
    .eq('product_id', productId)
    .order('position', { ascending: true });
  if (error) throw error;
  return data.map((row) => ({ id: row.id, position: row.position, url: publicUrlFor(row.storage_path) }));
}

// Admin-only — requires a signed-in Supabase Auth session (RLS policy in
// supabase/schema.sql restricts writes to `authenticated`). There is no
// admin login yet, so this will throw "row-level security" until one exists.
export async function uploadProductImage(productId, file, position = 0) {
  requireSupabase();
  const optimized = await compressImage(file);
  const ext = optimized.name.includes('.') ? optimized.name.split('.').pop() : 'jpg';
  // Random filename = content never changes at this path, so a 1-year cache
  // is safe: browsers and any CDN in front of Storage stop re-fetching it.
  const path = `${productId}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, optimized, { cacheControl: '31536000', upsert: false, contentType: optimized.type });
  if (uploadError) throw uploadError;

  const { data, error: insertError } = await supabase
    .from('product_images')
    .insert({ product_id: productId, storage_path: path, position })
    .select('id, storage_path, position')
    .single();
  if (insertError) throw insertError;

  return { id: data.id, position: data.position, url: publicUrlFor(data.storage_path) };
}

// Admin-only — same auth requirement as uploadProductImage.
export async function deleteProductImage(imageId, storagePath) {
  requireSupabase();
  const { error: storageError } = await supabase.storage.from(BUCKET).remove([storagePath]);
  if (storageError) throw storageError;
  const { error: dbError } = await supabase.from('product_images').delete().eq('id', imageId);
  if (dbError) throw dbError;
}

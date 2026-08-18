// Resizes + re-encodes a product photo client-side before it ever reaches
// Supabase Storage: smaller uploads (faster on a slow connection), smaller
// storage bill, and smaller downloads for every shopper who loads the
// catalog afterwards.
export async function compressImage(file, { maxDimension = 1600, quality = 0.82 } = {}) {
  if (!file.type.startsWith('image/')) return file;

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // unsupported format (e.g. some HEIC) — upload the original as-is
  }

  let { width, height } = bitmap;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const mimeType = 'image/webp';
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality));
  if (!blob) return file; // canvas.toBlob unsupported — fall back to the original

  const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
  return new File([blob], name, { type: mimeType });
}

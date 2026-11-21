import { supabase } from './supabase.js';

/**
 * Resize and convert an image File to WebP (or fallback JPEG) in the browser
 * before uploading to Supabase Storage, keeping gallery and menu photos fast for SEO.
 */
export async function optimizeImageFile(file, { maxWidth = 1800, quality = 0.85 } = {}) {
  if (!file || typeof document === 'undefined') return file;
  if (!file.type?.startsWith('image/')) return file;

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve(file);
            return;
          }
          const baseName = file.name.replace(/\.[^.]+$/, '');
          resolve(new File([blob], `${baseName}.webp`, { type: 'image/webp' }));
        },
        'image/webp',
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

export async function uploadToBucket(bucket, file, folder = '') {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and key to upload images.');
  }
  const optimized = await optimizeImageFile(file);
  const ext = (optimized.name.split('.').pop() || 'webp').toLowerCase();
  const safeSlug = optimized.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'image';

  const uniquePart = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const prefix = folder ? `${folder.replace(/^\/|\/$/g, '')}/` : '';
  const storagePath = `${prefix}${uniquePart}-${safeSlug}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(storagePath, optimized, {
    contentType: optimized.type || 'image/webp',
    cacheControl: '31536000',
    upsert: true,
  });

  if (error) {
    throw new Error(error.message || 'Storage upload failed');
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return {
    publicUrl: data.publicUrl,
    storagePath,
  };
}

export async function deleteFromBucket(bucket, storagePath) {
  if (!supabase || !storagePath) return;
  await supabase.storage.from(bucket).remove([storagePath]);
}

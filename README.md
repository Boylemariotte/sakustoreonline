# SAKU — tienda de ropa online

App de tienda (React + Vite) con catálogo, bolsa, favoritos y checkout por WhatsApp. Responsive: layout móvil por debajo de 900px, layout de escritorio por encima.

## Desarrollo

```bash
npm install
npm run dev
```

## Base de datos e imágenes (Supabase)

El catálogo hoy vive en `src/data/products.js` (estático). Para que el futuro panel de administración pueda subir fotos de las prendas, el proyecto ya trae preparada la integración con [Supabase](https://supabase.com) (Postgres + Storage, gratis):

1. Crea un proyecto en [app.supabase.com](https://app.supabase.com).
2. Ve a **SQL Editor** → pega y ejecuta `supabase/schema.sql` (crea las tablas `products` / `product_images` y las políticas de seguridad).
3. Ve a **Storage** → **New bucket** → nombre `product-images` → marca **Public bucket** → **Create**. (La creación del bucket por SQL depende de permisos que varían por proyecto; crearlo desde el panel siempre funciona.)
4. De vuelta en **SQL Editor**, corre `supabase/seed.sql` para llenar `products` con el catálogo actual de la tienda (21 prendas) — así la base ya nace con un catálogo real, no vacío.
5. Ve a **Project Settings → API** y copia la **Project URL** y la **anon public key**.
6. Copia `.env.example` a `.env.local` y pega ahí esos dos valores:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```
7. Si despliegas en Vercel, agrega esas mismas dos variables en **Project Settings → Environment Variables**.

La `anon key` es segura para exponer en el cliente — las políticas de seguridad (RLS) en `schema.sql` dejan lectura pública pero **solo permiten escribir (subir/borrar imágenes) a un usuario autenticado**, es decir, al admin una vez tenga login. Sin login de admin todavía, nadie (ni el sitio público) puede escribir en la base de datos, solo leer.

Código relevante:
- `src/lib/supabaseClient.js` — cliente de Supabase (no rompe la app si las variables de entorno no están configuradas).
- `src/lib/imageCompression.js` — redimensiona (máx. 1600px) y reconvierte a WebP cada foto en el navegador antes de subirla (~65-70% menos peso en las pruebas).
- `src/lib/productImages.js` — subir (con compresión + caché de 1 año), listar y borrar fotos de un producto.
- `supabase/schema.sql` — esquema de tablas + políticas de seguridad + bucket de imágenes.
- `supabase/seed.sql` — inserta el catálogo actual de 21 prendas en la tabla `products`.

Esto es solo la base: la tienda pública sigue leyendo del catálogo estático hasta que exista el panel de admin con login para subir fotos reales.

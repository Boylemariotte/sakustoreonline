-- SAKU store — seed data
-- Populates `products` with the current storefront catalog (src/data/products.js)
-- so the database starts with a full, real catalog instead of empty tables.
-- Run this once in the SQL Editor, after schema.sql. Safe to re-run: it
-- upserts by id, so it won't create duplicates.

insert into products
  (id, group_name, name, price, was, cat, tag, fabric, description, exclusive_until)
values
  ('w1', 'Mujer', 'Camisa de lino', 39.9, null, 'Mujer · Camisas', 'Nuevo', '100% lino lavado, tejido en Portugal.', 'Corte holgado, botones de nácar y puños que se remangan solos. Se arruga bonito.', null),
  ('w2', 'Mujer', 'Pantalón ancho', 45, 59, 'Mujer · Pantalones', null, 'Sarga de algodón con 3% elastano.', 'Tiro alto, pierna ancha y bolsillos de verdad. Cae recto sin planchar.', null),
  ('w3', 'Mujer', 'Jersey de punto fino', 49.9, null, 'Mujer · Punto', null, 'Mezcla de algodón y lana merino.', 'Punto fino de cuello redondo, suficiente para el aire acondicionado de la oficina.', null),
  ('w4', 'Mujer', 'Vestido midi', 55, null, 'Mujer · Vestidos', 'Últimas tallas', 'Popelín de algodón orgánico.', 'Manga corta, cintura marcada con cordón y bolsillos laterales.', null),
  ('w5', 'Mujer', 'Camiseta básica', 15.9, null, 'Mujer · Camisetas', null, 'Algodón peinado de 180 g.', 'La que se repite en tres colores. Cuello que no se deforma.', null),
  ('w6', 'Mujer', 'Chaqueta vaquera', 69, null, 'Mujer · Abrigos', null, 'Denim rígido de 12 oz.', 'Clásica, un poco corta, pensada para llevar abierta todo el año.', null),
  ('m1', 'Hombre', 'Camisa oxford', 42, null, 'Hombre · Camisas', 'Nuevo', 'Oxford de algodón de 140 g.', 'Cuello con botones, corte regular. Va igual de bien con vaqueros que con chinos.', null),
  ('m2', 'Hombre', 'Chino recto', 45, null, 'Hombre · Pantalones', null, 'Sarga de algodón lavada a la piedra.', 'Recto de arriba abajo, sin pinzas, en un beige que aguanta el verano.', null),
  ('m3', 'Hombre', 'Sudadera con capucha', 39.9, 49.9, 'Hombre · Sudaderas', null, 'Felpa francesa de 320 g.', 'Interior cepillado, capucha doble y puños que no se dan de sí.', null),
  ('m4', 'Hombre', 'Camiseta de cuello caja', 17.9, null, 'Hombre · Camisetas', null, 'Algodón de 200 g.', 'Hombro ligeramente caído y bajo recto. Nada más.', null),
  ('m5', 'Hombre', 'Sobrecamisa de pana', 59, null, 'Hombre · Abrigos', null, 'Pana de algodón de 8 wales.', 'A medio camino entre camisa y chaqueta, para las mañanas de octubre.', null),
  ('m6', 'Hombre', 'Vaquero cónico', 52, null, 'Hombre · Vaqueros', null, 'Denim con 2% elastano.', 'Ancho en el muslo, estrecho en el tobillo. Lavado medio.', null),
  ('k1', 'Niños', 'Camiseta a rayas', 12.9, null, 'Niños · Camisetas', 'Pack de 2', 'Algodón orgánico certificado.', 'Rayas marineras, cuello elástico para que entre la cabeza sin drama.', null),
  ('k2', 'Niños', 'Pantalón jogger', 19.9, null, 'Niños · Pantalones', null, 'Felpa ligera con puños elásticos.', 'Cintura ajustable con cordón interior y rodillas reforzadas.', null),
  ('k3', 'Niños', 'Vestido de flores', 24.9, 29.9, 'Niñas · Vestidos', null, 'Popelín de algodón.', 'Tirantes anchos, falda con vuelo y bolsillo pequeño delante.', null),
  ('k4', 'Niños', 'Chaqueta cortavientos', 34.9, null, 'Niños · Abrigos', 'Impermeable', 'Nylon reciclado con costuras selladas.', 'Se pliega en su propio bolsillo y aguanta el recreo mojado.', null),
  ('k5', 'Niños', 'Body de manga larga', 9.9, null, 'Bebé · Bodies', null, 'Punto de algodón suave.', 'Broches en el hombro y en la entrepierna. Talla del 1 al 24 meses.', null),
  ('k6', 'Niños', 'Peto vaquero', 29.9, null, 'Niños · Petos', null, 'Denim ligero de 10 oz.', 'Tirantes regulables y bolsillo canguro que siempre acaba con piedras.', null),
  ('x1', 'Exclusivos', 'Abrigo largo de lana', 129, null, 'Exclusivo · Abrigos', 'Exclusivo', 'Lana virgen de 600 g, forro interior de viscosa.', 'Edición limitada de 40 unidades. Corte oversize, solapa ancha y cinturón a juego.', '2026-08-19T23:59:00'),
  ('x2', 'Exclusivos', 'Chaqueta de cuero edición limitada', 189, 229, 'Exclusivo · Abrigos', 'Exclusivo', 'Cuero de cordero curtido al vegetal.', 'Numerada a mano, forro de raso y cierres metálicos macizos. Quedan pocas unidades.', '2026-08-21T18:00:00'),
  ('x3', 'Exclusivos', 'Vestido de gala bordado', 159, null, 'Exclusivo · Vestidos', 'Exclusivo', 'Seda con bordado floral hecho a mano.', 'Pieza de temporada, bordado íntegramente a mano. No vuelve a producirse.', '2026-08-18T21:00:00')
on conflict (id) do update set
  group_name      = excluded.group_name,
  name            = excluded.name,
  price           = excluded.price,
  was             = excluded.was,
  cat             = excluded.cat,
  tag             = excluded.tag,
  fabric          = excluded.fabric,
  description     = excluded.description,
  exclusive_until = excluded.exclusive_until;


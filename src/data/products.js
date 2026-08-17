export const CAT = {
  Mujer: [
    { id: 'w1', name: 'Camisa de lino', price: 39.9, cat: 'Mujer · Camisas', tag: 'Nuevo', fabric: '100% lino lavado, tejido en Portugal.', desc: 'Corte holgado, botones de nácar y puños que se remangan solos. Se arruga bonito.' },
    { id: 'w2', name: 'Pantalón ancho', price: 45.0, was: 59.0, cat: 'Mujer · Pantalones', fabric: 'Sarga de algodón con 3% elastano.', desc: 'Tiro alto, pierna ancha y bolsillos de verdad. Cae recto sin planchar.' },
    { id: 'w3', name: 'Jersey de punto fino', price: 49.9, cat: 'Mujer · Punto', fabric: 'Mezcla de algodón y lana merino.', desc: 'Punto fino de cuello redondo, suficiente para el aire acondicionado de la oficina.' },
    { id: 'w4', name: 'Vestido midi', price: 55.0, cat: 'Mujer · Vestidos', tag: 'Últimas tallas', fabric: 'Popelín de algodón orgánico.', desc: 'Manga corta, cintura marcada con cordón y bolsillos laterales.' },
    { id: 'w5', name: 'Camiseta básica', price: 15.9, cat: 'Mujer · Camisetas', fabric: 'Algodón peinado de 180 g.', desc: 'La que se repite en tres colores. Cuello que no se deforma.' },
    { id: 'w6', name: 'Chaqueta vaquera', price: 69.0, cat: 'Mujer · Abrigos', fabric: 'Denim rígido de 12 oz.', desc: 'Clásica, un poco corta, pensada para llevar abierta todo el año.' },
  ],
  Hombre: [
    { id: 'm1', name: 'Camisa oxford', price: 42.0, cat: 'Hombre · Camisas', tag: 'Nuevo', fabric: 'Oxford de algodón de 140 g.', desc: 'Cuello con botones, corte regular. Va igual de bien con vaqueros que con chinos.' },
    { id: 'm2', name: 'Chino recto', price: 45.0, cat: 'Hombre · Pantalones', fabric: 'Sarga de algodón lavada a la piedra.', desc: 'Recto de arriba abajo, sin pinzas, en un beige que aguanta el verano.' },
    { id: 'm3', name: 'Sudadera con capucha', price: 39.9, was: 49.9, cat: 'Hombre · Sudaderas', fabric: 'Felpa francesa de 320 g.', desc: 'Interior cepillado, capucha doble y puños que no se dan de sí.' },
    { id: 'm4', name: 'Camiseta de cuello caja', price: 17.9, cat: 'Hombre · Camisetas', fabric: 'Algodón de 200 g.', desc: 'Hombro ligeramente caído y bajo recto. Nada más.' },
    { id: 'm5', name: 'Sobrecamisa de pana', price: 59.0, cat: 'Hombre · Abrigos', fabric: 'Pana de algodón de 8 wales.', desc: 'A medio camino entre camisa y chaqueta, para las mañanas de octubre.' },
    { id: 'm6', name: 'Vaquero cónico', price: 52.0, cat: 'Hombre · Vaqueros', fabric: 'Denim con 2% elastano.', desc: 'Ancho en el muslo, estrecho en el tobillo. Lavado medio.' },
  ],
  'Niños': [
    { id: 'k1', name: 'Camiseta a rayas', price: 12.9, cat: 'Niños · Camisetas', tag: 'Pack de 2', fabric: 'Algodón orgánico certificado.', desc: 'Rayas marineras, cuello elástico para que entre la cabeza sin drama.' },
    { id: 'k2', name: 'Pantalón jogger', price: 19.9, cat: 'Niños · Pantalones', fabric: 'Felpa ligera con puños elásticos.', desc: 'Cintura ajustable con cordón interior y rodillas reforzadas.' },
    { id: 'k3', name: 'Vestido de flores', price: 24.9, was: 29.9, cat: 'Niñas · Vestidos', fabric: 'Popelín de algodón.', desc: 'Tirantes anchos, falda con vuelo y bolsillo pequeño delante.' },
    { id: 'k4', name: 'Chaqueta cortavientos', price: 34.9, cat: 'Niños · Abrigos', tag: 'Impermeable', fabric: 'Nylon reciclado con costuras selladas.', desc: 'Se pliega en su propio bolsillo y aguanta el recreo mojado.' },
    { id: 'k5', name: 'Body de manga larga', price: 9.9, cat: 'Bebé · Bodies', fabric: 'Punto de algodón suave.', desc: 'Broches en el hombro y en la entrepierna. Talla del 1 al 24 meses.' },
    { id: 'k6', name: 'Peto vaquero', price: 29.9, cat: 'Niños · Petos', fabric: 'Denim ligero de 10 oz.', desc: 'Tirantes regulables y bolsillo canguro que siempre acaba con piedras.' },
  ],
};

export const GROUPS = ['Mujer', 'Hombre', 'Niños'];

export const COLORS = [
  { name: 'Crema', hex: '#EFE4D2' },
  { name: 'Terracota', hex: '#C4714C' },
  { name: 'Verde oliva', hex: '#6F7A53' },
  { name: 'Azul noche', hex: '#3A4763' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
export const KID_SIZES = ['2A', '4A', '6A', '8A', '10A'];

export const ALL_PRODUCTS = GROUPS.reduce(
  (acc, g) => acc.concat(CAT[g].map((p) => Object.assign({ group: g }, p))),
  []
);

export function byGroup(g) {
  return CAT[g] || [];
}

export function findProduct(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || null;
}

export function sizesFor(product) {
  return product && product.group === 'Niños' ? KID_SIZES : SIZES;
}

document.addEventListener('DOMContentLoaded', () => {
  const precios = {
    remeraC: 28000,          
    remeraMonaco: 28000,     
    remeraN: 25000,          
    buzo: 45000,             
    buzoN: 45000             
  };

  const imagenes = {
    remeraC: 'img/Remera C.jpg',
    remeraMonaco: 'img/Remera monaco.jpg',
    remeraN: 'img/Remera N.jpg',
    buzo: 'img/buzo.jpg',
    buzoN: 'img/buzo n.jpg'
  };

  const $ = (id) => document.getElementById(id);

  $('calcular').addEventListener('click', () => {
    const cantidades = {
      remeraC: parseInt($('remeraC').value || 0),
      remeraMonaco: parseInt($('remeraMonaco').value || 0),
      remeraN: parseInt($('remeraN').value || 0),
      buzo: parseInt($('buzo').value || 0),
      buzoN: parseInt($('buzoN').value || 0)
    };

    let totalSinDesc = 0;
    let descuento = 0;


    for (const k in cantidades) {
      const cantidad = cantidades[k];
      const precio = precios[k];

     
      const pagadas = Math.ceil(cantidad / 2);
      totalSinDesc += pagadas * precio;


      const gratis = Math.floor(cantidad / 2);
      descuento += gratis * precio;
    }

 
    if (totalSinDesc > 150000) {
      const descExtra = totalSinDesc * 0.10;
      descuento += descExtra;
      totalSinDesc -= descExtra;
    }

    const totalFinal = totalSinDesc;

    let detalle = `
      <h3>Resumen</h3>
      <p>Descuento total: $${descuento.toLocaleString('es-AR')}</p>
      <p><strong>Total final: $${totalFinal.toLocaleString('es-AR')}</strong></p>
      <hr>
      <h4>Detalle por producto</h4>
    `;

    const nombres = {
      remeraC: 'Remera Cinque Terre',
      remeraMonaco: 'Remera Monaco',
      remeraN: 'Remera Western Oversize',
      buzo: 'Hoodie "Club" Marrón',
      buzoN: 'Hoodie "Club" Negro'
    };

    for (const k of Object.keys(cantidades)) {
      const cant = cantidades[k];
      if (cant > 0) {
        const sub = Math.ceil(cant / 2) * precios[k];
        detalle += `
          <div class="item">
            <img src="${imagenes[k]}" alt="${nombres[k]}">
            <p>${nombres[k]} x ${cant} (2x1 aplicado) = $${sub.toLocaleString('es-AR')}</p>
          </div>
        `;
      }
    }

    $('resultado').innerHTML = detalle;
  });
});

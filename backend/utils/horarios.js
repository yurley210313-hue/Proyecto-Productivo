export const obtenerHorariosBase = (fecha) => {
  const fechaObj = new Date(fecha + "T00:00:00");
  const dia = fechaObj.getDay(); // 0 domingo, 6 sábado

  const bloques = [];

  const agregarBloques = (inicio, fin) => {
    for (let m = inicio; m <= fin; m += 30) {
      const h = Math.floor(m / 60).toString().padStart(2, "0");
      const min = (m % 60).toString().padStart(2, "0");
      bloques.push(`${h}:${min}`);
    }
  };

  if (dia >= 1 && dia <= 5) {
    // Lunes a viernes
    agregarBloques(8 * 60, 11 * 60 + 30);   // 08:00 - 11:30
    agregarBloques(14 * 60, 16 * 60 + 30);  // 14:00 - 16:30
  } else {
    // Sábado y domingo
    agregarBloques(8 * 60, 11 * 60 + 30);   // 08:00 - 11:30
  }

  return bloques;
};
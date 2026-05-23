export default function calcularBloques(horaInicio, duracion) {
  const bloques = [];
  const [h, m] = horaInicio.split(":").map(Number);

  let minutosTotales = h * 60 + m;
  const cantidadBloques = duracion / 30;
  

  for (let i = 0; i < cantidadBloques; i++) {
    const hora = Math.floor(minutosTotales / 60)
      .toString()
      .padStart(2, "0");

    const minuto = (minutosTotales % 60)
      .toString()
      .padStart(2, "0");
      

    bloques.push(`${hora}:${minuto}`);

    minutosTotales += 30;
  }

  return bloques;
}
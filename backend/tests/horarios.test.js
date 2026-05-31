import { obtenerHorariosBase }
from "../utils/horarios.js";

describe("Horarios laborales", () => {

  test("Debe incluir 08:00 para un día laboral", () => {

    const horarios =
      obtenerHorariosBase("2025-11-17");

    expect(
      horarios.includes("08:00")
    ).toBe(true);

  });

});
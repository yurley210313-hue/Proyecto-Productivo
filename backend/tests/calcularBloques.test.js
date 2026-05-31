import calcularBloques from "../utils/calcularBloques.js";

describe("calcularBloques", () => {

  test("Debe generar bloques de 30 minutos para una cita de 60 minutos", () => {

    const resultado =
      calcularBloques("08:00", 60);

    expect(resultado).toEqual([
      "08:00",
      "08:30"
    ]);

  });

});
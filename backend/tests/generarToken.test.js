import jwt from "jsonwebtoken";
import { generarToken }
from "../utils/generarToken.js";

describe("JWT", () => {

  test("Debe generar un token válido", () => {

    process.env.JWT_SECRET =
      "clave_prueba";

    const usuario = {
      _id: "123",
      rol: "admin"
    };

    const token =
      generarToken(usuario);

    const decodificado =
      jwt.verify(
        token,
        "clave_prueba"
      );

    expect(
      decodificado.id
    ).toBe("123");

  });

});